<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Carbon\Exceptions\InvalidDateException;
use Carbon\Exceptions\InvalidFormatException;
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

        return $orders->sum(function($value){
            $shipping_lines = collect($value['shipping_lines']);
            return $shipping_lines->sum('price');
        });

        if(!$orders->isEmpty()) {
        }

    }
}
