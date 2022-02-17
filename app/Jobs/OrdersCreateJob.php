<?php

namespace App\Jobs;

use App\Models\ShippingRule;
use App\Models\User;
use Carbon\Carbon;
use Carbon\Exceptions\InvalidFormatException;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Osiset\ShopifyApp\Objects\Values\ShopDomain;
use stdClass;

class OrdersCreateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Shop's myshopify domain
     *
     * @var ShopDomain|string
     */
    public $shopDomain;

    private $shop;

    /**
     * The webhook data
     *
     * @var object
     */
    public $data;

    /**
     * Create a new job instance.
     *
     * @param string   $shopDomain The shop's myshopify domain.
     * @param stdClass $data       The webhook data (JSON decoded).
     *
     * @return void
     */
    public function __construct($shopDomain, $data)
    {
        $this->shop = User::where('name', 'uglyfoods.myshopify.com')->first();
        $this->shopDomain = $shopDomain;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        DB::beginTransaction();
        try {
            $orderData = $this->data;
            $customer = $this->data->customer;
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
                return response()->json([
                    'success' => false,
                    'message' => 'You have already earned on this delivery date!',
                    'data' => null
                ]);
            }
            $orders = $this->shop->api()->rest('GET', '/admin/api/2022-01/customers/' . $customer->id . '/orders.json');
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
                $totalShippingPriceSum = $ordersCollection->sum(function($value){
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
            return response()->json([
                'success' => true,
                'message' => 'Order created successfully!',
                'data' => null
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return $e->getMessage();
        }
    }
}
