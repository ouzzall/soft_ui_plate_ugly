<?php

namespace App\Jobs;

use App\Models\ShippingRule;
use App\Models\User;
use Carbon\Carbon;
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
            $shipping_rule_one = null;
            $todayDate = Carbon::today()->format('Y-m-d');
            $dateCheck = $user->loyalty()->whereDate('last_earned_date', '!=', $todayDate);
            if ($dateCheck) {
                $orders = $this->shop->api()->rest('GET', '/admin/api/2022-01/customers/' . $customer->id . '/orders.json');
                $orders = collect($orders['body']['orders']);
                $orders = $orders->map(function ($order) {
                    $tags = explode(', ', $order['tags']);
                    foreach ($tags as $tag) {
                        try {
                            if (Carbon::createFromFormat('d/m/Y', $tag) !== false) {
                                $order['delivery_date'] = $tag;
                            }
                        } catch (Exception $e) {
                            // exception
                        }
                    }
                    return $order;
                });
                return $ordersByDate = $orders->groupBy('delivery_date');
                foreach ($ordersByDate as $orders) {
                    $orderTotal = $orders->sum('subtotal_price');
                    $shippingTotal = $orders->sum('total_shipping_price_set.shop_money.amount');
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
