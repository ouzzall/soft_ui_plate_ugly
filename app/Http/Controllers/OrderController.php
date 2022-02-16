<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        return $this->shop->api()->rest('GET', '/admin/api/2022-01/orders.json');
    }
}
