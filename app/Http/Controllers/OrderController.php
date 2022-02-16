<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Carbon\Exceptions\InvalidDateException;
use Exception;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    private $shop;
    public function __construct()
    {
        $this->shop = User::where('name', 'uglyfoods.myshopify.com')->first();
    }
    public function getCustomerOrders()
    {
        $orders = $this->shop->api()->rest('GET', '/admin/api/2022-01/customers/5788963733594/orders.json');
        $orders = collect($orders['body']['orders']);
        $orders = $orders->map(function ($order) {
            $tags = explode(', ', $order['tags']);
            foreach ($tags as $tag) {
                try {
                    if(Carbon::createFromFormat('d/m/Y', $tag) !== false) {
                        $order['delivery_date'] = $tag;
                    }
                } catch (Exception $e) {
                    //
                }
            }
            return $order;
        });
        $ordersByDate = $orders->groupBy('delivery_date');
        foreach($ordersByDate as $orders) {
            return $orders->sum('subtotal_price');
            return $orders->sum('total_shipping_price_set.shop_money.amount');
        }
    }
}
