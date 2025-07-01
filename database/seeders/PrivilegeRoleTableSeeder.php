<?php

namespace Database\Seeders;

use App\Models\Privilege;
use App\Models\PrivilegeRole;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PrivilegeRoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch the 'Super Admin' role ID
        $superAdminRoleId = Role::where('name', 'Super Admin')->value('id');

        // Fetch all privileges
        $privileges = Privilege::all()->pluck('id')->toArray();

        // Prepare the privilege-role mapping
        $privilegeRole = [];

        // Assign all privileges to the 'Super Admin' role
        foreach ($privileges as $privilegeId) {
            $privilegeRole[] = [
                'id'           => (string) Str::uuid(), // Generate UUID for the privilege-role entry
                'role_id'      => $superAdminRoleId,
                'privilege_id' => $privilegeId,
                'created_at'   => now(),
                'updated_at'   => now(),
            ];
        }

        // Insert the privilege-role mappings
        PrivilegeRole::insert($privilegeRole);
    }
}
