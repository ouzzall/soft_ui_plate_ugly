<?php

namespace App\Http\Controllers;

use App\Models\RedemptionPlan;
use App\Models\RedemptionReward;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RedemptionController extends Controller
{
    public function add_plan(Request $request)
    {
        // return $request;

        if($request->id == "false")
        {
            $vbl = new RedemptionPlan;
            $vbl->title = $request->title;
            $vbl->days = $request->days;
            $vbl->orders = $request->orders;
            $vbl->percentage = $request->percentage;
            $vbl->star = $request->star;
            $vbl->save();

            $str['status']=true;
            $str['message']="NEW PLAN ADDED";
            $str['data']=$vbl;
            return $str;
        }
        else
        {
            $vbl = RedemptionPlan::find($request->id);
            $vbl->title = $request->title;
            $vbl->days = $request->days;
            $vbl->orders = $request->orders;
            $vbl->percentage = $request->percentage;
            $vbl->star = $request->star;
            $vbl->update();

            $str['status']=true;
            $str['message']="EXISTING PLAN UPDATED";
            $str['data']=$vbl;
            return $str;
        }
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

    public function delete_plan(Request $request)
    {
        // return $request;

        $vbl = RedemptionPlan::find($request->id);
        $vbl->delete();

        $str['status']=true;
        $str['message']="PLAN DELETED";
        return $str;
    }

    public function reward_manager_init(Request $request)
    {
        // return $request;

        $vbl1 = RedemptionPlan::all();
        $vbl2 = RedemptionReward::all();

        $vbl = User::where('name', 'kh-abdullah-str.myshopify.com')->first();
        // return $vbl;
        $response = $vbl->api()->rest('get', '/admin/api/2022-04/products.json');

        // return $response['body']['products'];

        $str['status']=true;
        $str['message']="ALL PLANS AND REWARDS SHOWN";
        $str['data']=array($vbl1,$vbl2,$response['body']['products']);
        return $str;
    }

    public function add_reward(Request $request)
    {
        // return $request;

        $vbl = new RedemptionReward;
        $vbl->reward_title = $request->reward_title;
        $vbl->reward_point = $request->reward_point;
        $vbl->prev_reward_id = $request->prev_reward_id;
        $vbl->plan_id = $request->plan_id;
        $vbl->product_id = $request->product_id;
        $vbl->variant_id = $request->variant_id;
        $vbl->image_src = $request->image_src;
        $vbl->save();

        $str['status']=true;
        $str['message']="NEW REWARD ADDDED";
        $str['data']=$vbl;
        return $str;
    }

    public function get_rewards(Request $request)
    {
        $user = Auth::user();


        // $price_rules = RedemptionReward::query();
        $price_rules = RedemptionReward::
        join('redemption_plans','redemption_plans.id','=','redemption_rewards.plan_id')
        ->leftJoin('redemption_rewards as new_table','new_table.id','=','redemption_rewards.prev_reward_id')
        ->select('redemption_rewards.*','redemption_plans.star','redemption_plans.title','new_table.reward_title as dependency_title');
        // ->select('redemption_rewards.*','redemption_plans.star','redemption_plans.title');
        // ->get();

        // return $price_rules;

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
