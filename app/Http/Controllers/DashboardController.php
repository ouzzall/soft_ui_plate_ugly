<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PriceRule;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getCharts()
    {
        $labels = [];
        $today = Carbon::today();
        $transactions = Transaction::selectRaw('SUM(loyalty_points) loyalty_points, month(created_at) month')->groupBy('month')->get();
        $orders = Order::selectRaw('SUM(amount) amount, month(created_at) month')->groupBy('month')->get();
        $loyaltyData = [];
        $totalOrdersData = [];
        $j = 0;
        $k = 0;
        for ($i = 1; $i <= 12; $i++) {
            $labels[] = Carbon::today()->month($i)->format('M');
            if (($transactions[$j]['month'] ?? 0) == $i) {
                $loyaltyData[] = $transactions[$j]['loyalty_points'] * 0.001;
                $j++;
            } else {
                $loyaltyData[] = 0;
            }
            if(($orders[$k]['month'] ?? 0) == $i) {
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
    public function getDashboardData()
    {
        $no_of_users = User::where('role_id', 2)->count();
        $no_of_coupons_created = PriceRule::count();
        $no_of_orders = Order::count();
        $total_points_earned = Transaction::where('transaction_type_id', 1)->sum('loyalty_points');
        $setting = Setting::first();
        $transactions = Transaction::with(['user', 'transaction_type'])->orderBy('id', 'DESC')->limit(5)->get();
        $transactions = $transactions->map(function ($value) {
            $value['date'] = Carbon::parse($value['created_at'])->format('d/m/Y');
            return $value;
        });
        $data = [
            'users' => $no_of_users,
            'coupons' => $no_of_coupons_created,
            'orders' => $no_of_orders,
            'points_earned' => $total_points_earned,
            'settings' => $setting,
            'transactions' => $transactions
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
        if(!$setting) {
            response()->json([
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
