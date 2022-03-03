<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function getUsers()
    {
        $users = User::where('role_id', 2)->with('loyalty')->get();
        return response()->json([
            'success' => true,
            'message' => 'Users retrieved successfully!',
            'data' => $users
        ]);
    }

    public function radeemPoints()
    {
        $user = Auth::user();
        if($user->loyalty->loyalty_earned < 10000) {
            return response()->json([
                'success' => false,
                'message' => 'You need at least 10000 loyalty points to perform radeem action!',
                'data' => null
            ]);
        }
        $code = Str::random(8);
        $value = $user->loyalty->loyalty_earned * 0.001;
        $starts_at = Carbon::now();
        $ends_at = $starts_at->addMonth();
        $createPriceRule = getShop()->api()->rest('POST', '/admin/api/2021-10/price_rules.json', [
            'price_rule' => [
                'title' => $code,
                'target_type' => "line_item",
                'target_selection' => "all",
                'allocation_method' => 'across',
                'value_type' => 'fixed_amount',
                'value' => "-" . $value,
                'customer_selection' => 'all',
                'starts_at' => $starts_at,
                'ends_at' => $ends_at,
            ]
        ]);
        if ($createPriceRule['status'] != 201) {
            return response()->json([
                'success' => false,
                'message' => 'An error occured. Unable to create price rule!',
                'data' => null
            ]);
        }
        $priceRule = $createPriceRule['body']['price_rule'];
        $discountCode = getShop()->api()->rest('POST', '/admin/api/2022-01/price_rules/' . $priceRule['id'] . '/discount_codes.json', [
            'discount_code' => [
                'code' => $code,
            ]
        ]);
        if ($discountCode['status'] != 201) {
            return response()->json([
                'success' => false,
                'message' => 'An error occured. Unable to create discount code!',
                'data' => null
            ]);
        }
        DB::beginTransaction();
        try {
            $user->loyalty()->increment('loyalty_radeemed', $user->loyalty->loyalty_earned);
            $user->loyalty()->decrement('loyalty_earned', $user->loyalty->loyalty_earned);
            $user->price_rules()->create([
                'price_rule_id' => $priceRule['id'],
                'title' => $priceRule['title'],
                'value_type' => $priceRule['value_type'],
                'value' => $priceRule['value'],
                'starts_at' => $starts_at,
                'ends_at' => $ends_at,
                'discount_code' => $priceRule['title'],
            ]);
            $user->transactions()->create([
                'loyalty_points' => $user->loyalty->loyalty_earned,
                'transaction_type_id' => 2,
            ]);
            $userData = $user->load(['loyalty','price_rules']);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Points Radeemed successfully!',
                'data' => $userData,
            ]);
        } catch (Exception $ex) {
            DB::rollBack();
            return $ex->getMessage();
        }
    }

    public function getProfile()
    {
        $user = Auth::user();
        $user = $user->load(['loyalty', 'price_rules' => function ($q){
            $q->latest();
        }]);
        return response()->json([
            'success' => true,
            'message' => 'User profile retrieved successfully!',
            'data' => $user,
        ]);
    }

    public function createUser(Request $request)
    {
        return $request->all();
    }
}
