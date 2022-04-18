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

class OrdersFulfilledJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Shop's myshopify domain
     *
     * @var ShopDomain|string
     */
    public $shopDomain;

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
        // Convert domain
        $this->shopDomain = ShopDomain::fromNative($this->shopDomain);
        $order = $this->data;
        $customer = $order->customer;
        $orderData = Order::firstWhere('order_number', $order->id);
        if (!$orderData) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found!',
                'data' => null,
            ]);
        }
        if ($orderData->is_fulfilled) {
            return response()->json([
                'success' => false,
                'message' => 'Order already fulfilled!',
                'data' => null,
            ]);
        }
        DB::beginTransaction();
        try {
            $orderData->update([
                'is_fulfilled' => 1,
            ]);
            $user = User::firstWhere('email', $customer->email);
            $user->loyalty()->increment('radeemable', $orderData->loyalty_points);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Order fulfilled successfully!',
                'data' => $orderData,
            ]);
        } catch (Exception $ex) {
            Log::info(json_encode($ex->getMessage()));
            DB::rollBack();
        }
        // Do what you wish with the data
        // Access domain name as $this->shopDomain->toNative()
    }
}
