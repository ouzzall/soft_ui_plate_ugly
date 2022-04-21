<?php

namespace Database\Seeders;

use App\Models\RedeemSetting;
use Illuminate\Database\Seeder;

class RedeemSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RedeemSetting::create([
            'min_redeem_value' => 0,
            'max_redeem_value' => 0
        ]);
    }
}
