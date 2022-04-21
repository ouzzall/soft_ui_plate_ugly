<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Mail\SendRedeemMail;
use App\Models\Order;
use App\Models\RedeemSetting;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function getUsers(Request $request)
    {
        $users = User::where('role_id', 2)->with('loyalty');
        $users->when($request->get('startDate') || $request->get('endDate'), function($q) use($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $users->when($request->has('is_blocked'), function($q) use($request) {
            $q->where('is_blocked', $request->is_blocked);
        });
        $users->when($request->get('search'), function ($q) use ($request) {
            $q->where(function ($q) use ($request) {
                $q->where('id', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('name', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('email', 'LIKE', '%' . $request->search . '%')
                    ->orWhereHas('role', function ($q) use ($request) {
                        $q->where('title', 'LIKE', '%' . $request->search . '%');
                    })
                    ->orWhereHas('loyalty', function ($q) use ($request) {
                        $q->where('loyalty_earned', 'LIKE', '%' . $request->search . '%')
                            ->orWhere('loyalty_redeemed', 'LIKE', '%' . $request->search . '%');
                    });
            });
        });
        $count = $users->count();
        $users->when($request->has('skip') && $request->has('limit'), function ($q) use ($request) {
            $q->take($request->limit)->skip($request->skip);
        });
        $users = $users->orderBy('id', 'DESC')->get();
        $data = [
            'data' => $users,
            'pages' => ceil($count / $request->limit),
            'row_count' => $count,
        ];
        return response()->json([
            'success' => true,
            'message' => 'Users retrieved successfully!',
            'data' => $data
        ]);
    }

    public function redeemPoints(Request $request)
    {
        $user = Auth::user();
        if ($user->is_blocked && $user->role->type == 'customer') {
            return response()->json([
                'success' => false,
                'message' => 'You are blocked from using the application!',
                'data' => null
            ]);
        }
        $RedeemSetting = RedeemSetting::first();
        $code = Str::random(8);
        if($request->get('loyalty_points')) {
            $loyalty = (int) $request->loyalty_points;
        } else {
            $loyalty = $user->loyalty->loyalty_earned;
        }
        $value = $loyalty * 0.001;
        if ($loyalty < $RedeemSetting->min_redeem_value) {
            return response()->json([
                'success' => false,
                'message' => 'You can redeem minimum '. $RedeemSetting->min_redeem_value .' loyalty points!',
                'data' => null
            ]);
        }
        if ($loyalty > $RedeemSetting->max_redeem_value) {
            return response()->json([
                'success' => false,
                'message' => 'You can redeem maximum ' . $RedeemSetting->max_redeem_value .' loyalty points!',
                'data' => null
            ]);
        }
        $starts_at = Carbon::now();
        $current = Carbon::now();
        $ends_at = $current->addMonth();
        $createPriceRule = getShop()->api()->rest('POST', '/admin/api/2021-10/price_rules.json', [
            'price_rule' => [
                'title' => $code,
                'target_type' => "line_item",
                'target_selection' => "all",
                'allocation_method' => 'across',
                'usage_limit' => 1,
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
            $user->loyalty()->increment('loyalty_redeemed', $loyalty);
            $user->loyalty()->decrement('loyalty_earned', $loyalty);
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
                'loyalty_points' => $loyalty,
                'transaction_type_id' => 2,
            ]);
            $userData = $user->load(['loyalty', 'price_rules' => function ($q) {
                $q->latest();
            }]);
            DB::commit();
            Mail::to($user->email)->send(new SendRedeemMail($user->name));
            return response()->json([
                'success' => true,
                'message' => 'Points Redeemed successfully!',
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
        if ($user->is_blocked && $user->role->type == 'customer') {
            return response()->json([
                'success' => false,
                'message' => 'You are blocked from using the application!',
                'data' => null
            ]);
        }
        $couponsCount = $user->price_rules()->count();
        $ordersSum = $user->orders()->sum('amount');
        $ordersCounts = $user->orders()->count();
        $user = $user->load(['loyalty', 'transactions' => function ($q) {
            $q->with(['user', 'transaction_type'])->limit(5);
        }, 'price_rules' => function ($q) {
            $q->latest();
        }]);
        $user['transactions'] = $user->transactions->map(function ($value) {
            $value['date'] = Carbon::parse($value['created_at'])->format('d/m/Y');
            return $value;
        });
        $redeemSetting = RedeemSetting::first();
        $data = [
            'redeem_setting' => $redeemSetting,
            'user' => $user,
            'others' => [
                'coupons_created' => $couponsCount,
                'orders_created' => $ordersCounts,
                'total_orders_amount' => $ordersSum
            ]
        ];
        return response()->json([
            'success' => true,
            'message' => 'User profile retrieved successfully!',
            'data' => $data,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        if ($user->is_blocked && $user->role->type == 'customer') {
            return response()->json([
                'success' => false,
                'message' => 'You are blocked from using the application!',
                'data' => null
            ]);
        }
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found!',
                'data' => $user,
            ]);
        }
        $user->update($request->all());
        $user = Auth::user()->load(['role', 'transactions']);
        return response()->json([
            'success' => true,
            'message' => 'User profile updated successfully!',
            'data' => $user,
        ]);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $user = Auth::user();
        $password = bcrypt($request->new_password);
        $user->update([
            'password' => $password,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Password changed successfully!',
            'data' => null,
        ]);
    }

    public function getUserCharts()
    {
        $labels = [];
        $user = Auth::user();
        if ($user->is_blocked && $user->role->type == 'customer') {
            return response()->json([
                'success' => false,
                'message' => 'You are blocked from using the application!',
                'data' => null
            ]);
        }
        $today = Carbon::today();
        $callback = function ($q) use ($user) {
            $q->where('id', $user->id);
        };
        $transactions = Transaction::selectRaw('SUM(loyalty_points) loyalty_points, month(created_at) month')->whereHas('user', $callback)->groupBy('month')->get();
        $orders = Order::selectRaw('SUM(amount) amount, month(created_at) month')->whereHas('user', $callback)->groupBy('month')->get();
        $loyaltyData = [];
        $totalOrdersData = [];
        $j = 0;
        $k = 0;
        for ($i = 1; $i <= 12; $i++) {
            $labels[] = Carbon::today()->month($i)->format('M');
            if (($transactions[$j]['month'] ?? 0) == $i) {
                $loyaltyData[] = $transactions[$j]['loyalty_points'];
                $j++;
            } else {
                $loyaltyData[] = 0;
            }
            if (($orders[$k]['month'] ?? 0) == $i) {
                $totalOrdersData[] = $orders[$k]['amount'];
                $k++;
            } else {
                $totalOrdersData[] = 0;
            }
        }
        $datasets = [
            [
                'label' => 'Loyalty Points',
                'color' => 'info',
                'data' => $loyaltyData,
            ],
            [
                'label' => 'Orders Amount',
                'color' => 'dark',
                'data' => $totalOrdersData,
            ]
        ];
        $data = [
            'sales_chart' => [
                'labels' => $labels,
                'datasets' => $datasets,
            ]
        ];
        return response()->json([
            'success' => true,
            'message' => 'Chart retrieved successfully!',
            'data' => $data,
        ]);
    }

    public function changeAuthority(Request $request, $id)
    {
        $user = User::where('role_id', 2)->find($id);
        $action = $request->is_blocked ? 'blocked' : 'unblocked';
        if(!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found!',
                'data' => null,
            ]);
        }
        $user->update([
            'is_blocked' => $request->is_blocked
        ]);
        return response()->json([
            'success' => true,
            'message' => "User $action successfully!",
            'data' => null,
        ]);
    }
}
