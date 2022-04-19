<?php

namespace Database\Seeders;

use App\Models\RadeemSetting;
use Illuminate\Database\Seeder;

class RadeemSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RadeemSetting::create([
            'min_radeem_value' => 0,
            'max_radeem_value' => 0
        ]);
    }
}
