<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RolesTableSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'id'         => (string) Str::uuid(), // Generate UUID
                'name'       => 'Super Admin', // super admin
                'parent_id'  => null,
                'score'      => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id'         => (string) Str::uuid(),
                'name'       => 'Admin', // admin
                'parent_id'  => null,
                'score'      => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id'         => (string) Str::uuid(),
                'name'       => 'Customer', // customer
                'parent_id'  => null,
                'score'      => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id'         => (string) Str::uuid(),
                'name'       => 'Retailer', // shop
                'parent_id'  => null,
                'score'      => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id'         => (string) Str::uuid(),
                'name'       => 'Delivery', // delivery person
                'parent_id'  => null,
                'score'      => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Role::insert($roles);
    }
}
