<?php

namespace App\Http\Controllers;

use App\Models\RedemptionPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class RedemptionController extends Controller
{
    public function add_plan(Request $request)
    {
        // return $request;

        $vbl = new RedemptionPlan;
        $vbl->title = $request->title;
        $vbl->days = $request->days;
        $vbl->orders = $request->orders;
        $vbl->percentage = $request->percentage;
        $vbl->save();

        $str['status']=true;
        $str['message']="NEW PLAN ADDED";
        $str['data']=$vbl;
        return $str;
    }

    public function get_plans(Request $request)
    {
        // return $request;

        // $vbl = RedemptionPlan::all();
        // return $vbl;

        $user = Auth::user();
        $price_rules = RedemptionPlan::query();
        $price_rules->when($user->role->type == 'customer', function ($q) use ($user) {
            $q->whereHas('user', function ($q) use ($user) {
                $q->where('id', $user->id);
            });
        });
        $price_rules->when($request->get('startDate') || $request->get('endDate'), function($q) use($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $price_rules->when($request->get('search'), function ($q) use ($request) {
            try {
                $input = Carbon::createFromFormat('d/m/Y', $request->search)->format('Y-m-d');
            } catch (InvalidFormatException $ex) {
                $input = $request->search;
            }
            $q->where(function($q) use ($input) {
                $q->whereHas('user', function($q) use ($input) {
                    $q->where('name', 'LIKE', '%' . $input . '%')
                    ->orWhere('email', 'LIKE', '%' . $input . '%');
                })
                ->orWhere('discount_code', 'LIKE', '%'. $input .'%')
                ->orWhereDate('starts_at', 'LIKE', '%'. $input .'%')
                ->orWhereDate('ends_at', 'LIKE', '%'. $input .'%');
            });
        });
        $count = $price_rules->count();
        $price_rules->when($request->has('skip') && $request->has('limit'), function ($q) use ($request) {
            $q->take($request->limit)->skip($request->skip);
        });
        $price_rules = $price_rules->orderBy('id', 'DESC')->get();
        $price_rules = $price_rules->map(function ($value) {
            $value['starts_at'] = Carbon::parse($value['starts_at'])->format('d/m/Y');
            $value['ends_at'] = Carbon::parse($value['ends_at'])->format('d/m/Y');
            return $value;
        });
        $data = [
            'data' => $price_rules,
            'pages' => ceil($count / $request->limit),
            'row_count' => $count,
        ];
        return response()->json([
            'success' => true,
            'message' => 'Discount Rules retrieved sucessfully!',
            'data' => $data,
        ]);
    }
}
