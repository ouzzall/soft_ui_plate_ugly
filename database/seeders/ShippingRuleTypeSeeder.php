<?php

namespace Database\Seeders;

use App\Models\ShippingRuleType;
use Illuminate\Database\Seeder;

class ShippingRuleTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ShippingRuleType::create([
            'title' => 'Order Wise Shipping'
        ]);

        ShippingRuleType::create([
            'title' => 'Area Wise Shipping'
        ]);
    }
}
