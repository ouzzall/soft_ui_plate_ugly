<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Carbon\Exceptions\InvalidDateException;
use Carbon\Exceptions\InvalidFormatException;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function __construct()
    {
    }

    public function getOrders()
    {
        $orders = Order::all()->load('user');
        return response()->json([
            'success' => true,
            'message' => 'Orders retrieved sucessfully!',
            'data' => $orders,
        ]);
    }
}
