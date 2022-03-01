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
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
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

    public function getOrderDetail($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found',
                'data' => null
            ], Response::HTTP_NOT_FOUND);
        }
        $shopOrderDetails = getShop()->api()->rest('GET', '/admin/api/2021-10/orders/' . $order->order_number . '.json')['body']['order'];
        $product_ids = implode(',', Arr::pluck($shopOrderDetails['line_items']->toArray(), 'product_id'));
        $orderProductDetails = getShop()->api()->rest('GET', '/admin/api/2021-10/products.json', [
            'ids' => $product_ids,
            'fields' => 'id,image'
        ]);
        $arr = $shopOrderDetails['line_items']->toArray();
        foreach ($arr as $key => &$product) {
            $product['is_refunded'] = false;
            $productRefundCheck = $order->refunds()->firstWhere('product_id', $product['product_id']);
            if ($productRefundCheck) {
                $product['is_refunded'] = true;
            }
            $searchedIndex = array_search($product['product_id'], Arr::pluck($orderProductDetails['body']['products'], 'id'));
            if ($orderProductDetails['body']['products'][$searchedIndex]['image'] != null) {
                $product['image_url'] = $orderProductDetails['body']['products'][$searchedIndex]['image']['src'];
            } else {
                $product['image_url'] = null;
            }
        }
        $shipping_lines = collect($shopOrderDetails['shipping_lines']);
        $shopOrderDetails['shipping_cost'] = $shipping_lines->sum('price');
        $shopOrderDetails['line_items'] = $arr;
        return response()->json([
            'success' => true,
            'message' => 'Order retrieved successfully!',
            'data' => $shopOrderDetails
        ], Response::HTTP_OK);
    }

    public function refund(Request $request)
    {
        DB::beginTransaction();
        try {
            $order = Order::firstWhere('order_number', $request->order_id);
            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order not found',
                    'data' => null,

                ], Response::HTTP_NOT_FOUND);
            }
            $refund = $order->refunds()->firstWhere('product_id', $request->product_id);
            if ($refund) {
                return response()->json([
                    'success' => false,
                    'message' => 'Refund for this Order Product already exist!',
                    'data' => null

                ], Response::HTTP_NOT_FOUND);
            }
            $loyalty_points = false;
            $shopOrderDetails = getShop()->api()->rest('GET', '/admin/api/2021-10/orders/' . $order->order_number . '.json')['body']['order'];
            foreach ($shopOrderDetails['line_items'] as $line_item) {
                if ($request->product_id == $line_item['product_id']) {
                    $loyalty_points = $line_item['quantity'] * $line_item['price'];
                }
            }
            if (!$loyalty_points) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found in this order!',
                    'data' => null,

                ], Response::HTTP_NOT_FOUND);
            }
            $order->refunds()->create([
                'product_id' => $request->product_id,
                'loyalty_points' => $loyalty_points,
            ]);
            $order->user->loyalty()->increment('loyalty_earned', $loyalty_points);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Product refunded and Amount added to loyalty!',
                'data' => null,

            ], Response::HTTP_OK);
        } catch (Exception $ex) {
            DB::rollBack();
        }
    }
}
