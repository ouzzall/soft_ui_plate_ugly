<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function getUsers(Request $request)
    {
        $users = User::where('role_id', 2)->with('loyalty');
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
                            ->orWhere('loyalty_radeemed', 'LIKE', '%' . $request->search . '%');
                    });
            });
        });
        $count = $users->count();
        $users->when($request->has('skip') && $request->has('limit'), function ($q) use ($request) {
            $q->take($request->limit)->skip($request->skip);
        });
        $users = $users->get();
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

    public function radeemPoints()
    {
        $user = Auth::user();
        if ($user->loyalty->loyalty_earned < 10000) {
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
            $userData = $user->load(['loyalty', 'price_rules' => function ($q) {
                $q->latest();
            }]);
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
        $data = [
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

    public function createUser(Request $request)
    {
        return $request->all();
    }

    public function getUserCharts()
    {
        $labels = [];
        $user = Auth::user();
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
}
