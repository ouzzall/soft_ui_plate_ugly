<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'title' => 'Admin',
            'type' => 'admin'
        ]);

        Role::create([
            'title' => 'Customer',
            'type' => 'customer'
        ]);
    }
}
