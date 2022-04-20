<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PriceRule;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\User;
use App\Models\UserLoyalty;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    private function getChart($request)
    {
        $labels = [];
        $today = Carbon::today();
        $transactions = Transaction::query();
        $transactions->when($request->get('startDate') || $request->get('endDate'), function ($q) use ($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $transactions = $transactions->selectRaw('SUM(loyalty_points) loyalty_points, month(created_at) month')->groupBy('month')->get();

        $orders = Order::query();
        $orders->when($request->get('startDate') || $request->get('endDate'), function ($q) use ($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $orders = $orders->selectRaw('SUM(amount) amount, month(created_at) month')->groupBy('month')->get();

        $loyaltyData = [];
        $totalOrdersData = [];
        $j = 0;
        $k = 0;
        for ($i = 1; $i <= 12; $i++) {
            $labels[] = Carbon::now()->startOfMonth()->month($i)->format('M');
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
            'labels' => $labels,
            'datasets' => $datasets,
        ];
        return $data;
    }

    private function getSecondChart($request)
    {
        $colors = [
            'primary',
            'secondary',
            'info',
            'success',
            'warning',
        ];
        $loyalty_sum = Transaction::query();
        $loyalty_sum->when($request->get('startDate') || $request->get('endDate'), function ($q) use ($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $loyalty_sum = $loyalty_sum->orderBy('loyalty_points', 'DESC')->where('transaction_type_id', 1)->limit(5)->sum('loyalty_points') * 0.001;

        $users = User::where('role_id', 2)->whereHas('transactions', function ($q) use ($request) {
            $q->when($request->get('startDate') || $request->get('endDate'), function ($q) use ($request) {
                $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
            })->orderBy('loyalty_points', 'DESC');;
        })->limit(5)->get();

        $labels = [];
        $backgroundColors = [];
        $data = [];
        for ($i = 0; $i < 5; $i++) {
            $user = $users[$i] ?? null;
            if ($user) {
                $loyalty_points = $user->transactions();
                $loyalty_points->when($request->get('startDate') || $request->get('endDate'), function ($q) use ($request) {
                    $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
                });
                $loyalty_points = $loyalty_points->where('transaction_type_id', 1)->sum('loyalty_points');

                $labels[] = $user->name;
                $data[] = number_format((($loyalty_points * 0.001) / ($loyalty_sum == 0 ? 1 : $loyalty_sum)) * 100, 2);
            } else {
                $labels[] = 'No customer';
                $data[] = (0 / ($loyalty_sum == 0 ? 1 : $loyalty_sum)) * 100;
            }
            $backgroundColors[] = $colors[$i];
        }
        $datasets = [
            'label' => 'Consumption',
            'backgroundColors' => $backgroundColors,
            'data' => $data,
        ];
        $data = [
            'labels' => $labels,
            'datasets' => $datasets,
            'count' => $loyalty_sum
        ];
        return $data;
    }

    public function getDashboardData(Request $request)
    {
        $no_of_users = User::query();
        $no_of_users->when($request->get('startDate') || $request->get('endDate'), function ($q) use ($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $no_of_users = $no_of_users->where('role_id', 2)->count();

        $no_of_coupons_created = PriceRule::query();
        $no_of_coupons_created->when($request->get('startDate') || $request->get('endDate'), function ($q) use ($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $no_of_coupons_created = $no_of_coupons_created->count();

        $no_of_orders = Order::query();
        $no_of_orders->when($request->get('startDate') || $request->get('endDate'), function ($q) use ($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $no_of_orders = $no_of_orders->count();

        $total_points_earned = Transaction::query();
        $total_points_earned->when($request->get('startDate') || $request->get('endDate'), function ($q) use ($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $total_points_earned = $total_points_earned->where('transaction_type_id', 1)->sum('loyalty_points');

        $setting = Setting::first();

        $transactions = Transaction::query();
        $transactions->when($request->get('startDate') || $request->get('endDate'), function ($q) use ($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $transactions = $transactions->with(['user', 'transaction_type'])->orderBy('id', 'DESC')->limit(5)->get();
        $transactions = $transactions->map(function ($value) {
            $value['date'] = Carbon::parse($value['created_at'])->format('d/m/Y');
            return $value;
        });

        $data = [
            'dashboard' => [
                'users' => $no_of_users,
                'coupons' => $no_of_coupons_created,
                'orders' => $no_of_orders,
                'points_earned' => $total_points_earned,
                'settings' => $setting,
                'transactions' => $transactions
            ],
            'first_chart' => $this->getChart($request),
            'second_chart' => $this->getSecondChart($request),

        ];
        return response()->json([
            'success' => true,
            'message' => 'Dashboard data retrieved successfully!',
            'data' => $data,
        ]);
    }

    public function updateSetting(Request $request)
    {
        $setting = Setting::first();
        if (!$setting) {
            return response()->json([
                'success' => false,
                'message' => 'Setting not found!',
                'data' => null,
            ]);
        }
        $setting->update($request->all());
        return response()->json([
            'success' => true,
            'message' => 'Setting updated successfully!',
            'data' => $setting,
        ]);
    }
}
