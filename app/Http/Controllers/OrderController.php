<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Carbon\Exceptions\InvalidDateException;
use Carbon\Exceptions\InvalidFormatException;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct()
    {
    }
    public function getCustomerOrders()
    {
        $orders = getShop()->api()->rest('GET', '/admin/api/2022-01/orders.json');
        return $orders['body']['orders'][0]->customer;
    }
}
