<?php

use App\Models\Campaign;
use App\Models\ShippingRule;
use App\Models\User;
use Carbon\Carbon;
use Carbon\Exceptions\InvalidFormatException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

if (!function_exists('getShop')) {
    function getShop()
    {
        $shop = User::firstWhere('name', 'uglyfoods.myshopify.com');
        return $shop;
    }
}

if (!function_exists('loyaltyCalculator')) {
    function loyaltyCalculator($user, $order)
    {
        $result = [];

        //Rule (Order based)
        $deliveryDate = '';
        $orderTags = explode(', ', $order->tags);
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
        $orders = getShop()->api()->rest('GET', '/admin/api/2022-01/customers/' . $user->shopify_customer_id . '/orders.json');
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
                } elseif ($shipping_rule_one->discount_type == 'percentage') {
                    $loyaltyValue = $totalShippingPriceSum * ($shipping_rule_one->shipping_amount / 100);
                }
                $result = [
                    'loyalty_earned' => $loyaltyValue,
                    'last_earned_date' => $deliveryDate
                ];
                return $result;
            }
        }
        // Rule (Product / Collection based)
        $item_ids = collect($order->line_items)->pluck('product_id');

        // for products
        $campaign = Campaign::whereHas('products', function ($q) use ($item_ids) {
            $q->whereIn('product_id', $item_ids)->where('type', 'product');
        })->where('is_active', 1)->first();
        if ($campaign) {
            $result = [
                'loyalty_earned' => $campaign->loyalty,
                'last_earned_date' => $deliveryDate
            ];
            return $result;
        }
        // for collections
        foreach ($item_ids as $id) {
            $collections = getShop()->api()->rest('GET', '/admin/api/2022-01/collects.json', [
                'product_id' => $id
            ]);
            if ($collections['status'] == 200) {
                $collection_ids = collect($collections['body']['collects'])->pluck('collection_id');
                $collectionCampaign = Campaign::whereHas('products', function ($q) use ($collection_ids) {
                    $q->whereIn('product_id', $collection_ids)->where('type', 'collection');
                })->where('is_active', 1)->first();
                if ($collectionCampaign) {
                    $result = [
                        'loyalty_earned' => $collectionCampaign->loyalty,
                        'last_earned_date' => $deliveryDate
                    ];
                    return $result;
                }
            }
        }
        return false;
    }
}
