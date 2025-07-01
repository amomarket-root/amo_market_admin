<?php

namespace Database\Seeders;

use App\Models\SystemService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class SystemServicesSeeder extends Seeder
{
    public function run()
    {
        SystemService::create([
            'id'          => Str::uuid(),
            'name'        => 'Delivery Service',
            'slug'        => 'delivery',
            'charge'      => 10.00,
            'is_active'   => true,
            'description' => 'Standard delivery charge for all orders',
        ]);

        SystemService::create([
            'id'          => Str::uuid(),
            'name'        => 'Platform Service',
            'slug'        => 'platform',
            'charge'      => 5.00,
            'is_active'   => true,
            'description' => 'Platform service fee for all transactions',
        ]);
    }
}
