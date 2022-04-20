<?php

namespace App\Jobs;

use App\Mail\SendLoyaltyMail;
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
use Illuminate\Support\Facades\Mail;
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
            if(!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found!!',
                    'data' => $user,
                ]);
            }
            $loyaltyCalculated = loyaltyCalculator($user, $order);
            if ($loyaltyCalculated !== false) {
                $user->loyalty()->increment('loyalty_earned', $loyaltyCalculated['loyalty_earned']);
                $user->loyalty()->update([
                    'last_earned_date' => $loyaltyCalculated['last_earned_date']
                ]);
                $orderData->update([
                    'loyalty_points' => $loyaltyCalculated['loyalty_earned'],
                    'delivery_date' => $loyaltyCalculated['last_earned_date'],
                ]);
                $user->transactions()->create([
                    'loyalty_points' => $loyaltyCalculated['loyalty_earned'],
                    'transaction_type_id' => 1,
                ]);
                Mail::to($user->email)->send(new SendLoyaltyMail($user->name));
            }
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
