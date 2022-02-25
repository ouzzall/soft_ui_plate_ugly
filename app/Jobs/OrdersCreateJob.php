<?php

namespace App\Jobs;

use App\Models\Order;
use App\Models\User;
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
        $order = $this->data;
        $customer = $order->customer;
        DB::beginTransaction();
        try {
            $localOrder = Order::create([
                'order_number' => $order->id,
                'order_name' => $order->name,
                'customer_email' => $customer->email,
                'customer_name' => $customer->first_name . " " . $customer->last_name,
                'amount' => $order->subtotal_price,
            ]);
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
            $loyaltyCalculated = loyaltyCalculator($user, $order);
            if ($loyaltyCalculated !== false) {
                $user->loyalty()->increment('loyalty_earned', $loyaltyCalculated['loyalty_earned']);
                $user->loyalty()->update([
                    'last_earned_date' => $loyaltyCalculated['last_earned_date']
                ]);
                $localOrder->update([
                    'loyalty_points' => $loyaltyCalculated['loyalty_earned']
                ]);
                $user->transactions()->create([
                    'loyalty_points' => $loyaltyCalculated['loyalty_earned'],
                    'transaction_type_id' => 1,
                ]);
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Order created successfully!',
                'data' => null,
            ]);
        } catch (Exception $ex) {
            DB::rollBack();
        }
    }
}
