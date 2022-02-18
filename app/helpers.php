<?php

use App\Models\ShippingRule;
use App\Models\User;
use Carbon\Carbon;
use Carbon\Exceptions\InvalidFormatException;
use Illuminate\Support\Facades\DB;

if (!function_exists('getShop')) {
    function getShop()
    {
        $shop = User::firstWhere('name', 'uglyfoods.myshopify.com');
        return $shop;
    }
}

if (!function_exists('loyalty')) {
    function loyaltyCalculator($order)
    {
        DB::beginTransaction();
        try {
            $orderData = collect($order);
            $customer = $orderData->customer;
            $user = User::firstWhere('email', $customer->email);
            if (!$user) {
                $user = User::create([
                    'shopify_customer_id' => $customer->id,
                    'email' => $customer->email,
                    'name' => $customer->first_name . " " . $customer->last_name,
                    'password' => bcrypt('Customer@123'),
                    'role_id' => 2,
                ]);
                $user->loyalty()->create([
                    'loyalty_earned' => 0.0,
                    'loyalty_radeemed' => 0.0,
                ]);
            }

            //Rule 1
            $deliveryDate = '';
            $orderTags = explode(', ', $orderData->tags);
            foreach ($orderTags as $tag) {
                try {
                    $date = Carbon::createFromFormat('Y/m/d', $tag);
                    if ($date !== false) {
                        $deliveryDate = $date->format('Y-m-d');
                    }
                } catch (InvalidFormatException $ex) {
                    // format exception
                }
            }
            $dateCheck = $user->loyalty()->whereDate('last_earned_date', $deliveryDate)->first();
            if ($dateCheck) {
                return false;
            }
            $orders = getShop()->api()->rest('GET', '/admin/api/2022-01/customers/' . $customer->id . '/orders.json');
            $ordersCollection = collect($orders['body']['orders']);
            $ordersCollection = $ordersCollection->filter(function ($order) use ($deliveryDate) {
                $tags = explode(', ', $order['tags']);
                foreach ($tags as $tag) {
                    try {
                        $date = Carbon::createFromFormat('Y/m/d', $tag);
                        if ($date !== false) {
                            return $date->format('Y-m-d') === $deliveryDate;
                        }
                    } catch (InvalidFormatException $ex) {
                        // format exception
                    }
                }
            });
            if ($ordersCollection->isNotEmpty()) {
                $totalOrderPriceSum = $ordersCollection->sum('subtotal_price');
                $totalShippingPriceSum = $ordersCollection->sum(function ($value) {
                    $shipping_lines = collect($value['shipping_lines']);
                    return $shipping_lines->sum('price');
                });
                $shipping_rule_one = ShippingRule::where('shipping_rule_type', 1)->where('is_active', 1)
                    ->where('order_amount', '<=', $totalOrderPriceSum)->first();
                if ($shipping_rule_one) {
                    $loyaltyValue = 0;
                    if ($shipping_rule_one->discount_type == 'fixed') {
                        $loyaltyValue = $shipping_rule_one->shipping_amount;
                        $user->loyalty()->increment('loyalty_earned', $loyaltyValue);
                    } elseif ($shipping_rule_one->discount_type == 'percentage') {
                        $loyaltyValue = $totalShippingPriceSum * ($shipping_rule_one->shipping_amount / 100);
                        $user->loyalty()->increment('loyalty_earned', $loyaltyValue);
                    }
                    $user->loyalty()->update([
                        'last_earned_date' => $deliveryDate
                    ]);
                }
            }
            DB::commit();
            return true;
        } catch (Exception $e) {
            DB::rollBack();
            return false;
        }
    }
}
