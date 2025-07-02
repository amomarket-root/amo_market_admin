<?php

namespace Database\Seeders;

use App\Mail\RegistrationMail;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $superAdminRole = Role::where('name', 'Super Admin')->first();

        $userData = [
            'id'         => (string) Str::uuid(),
            'role_id'    => $superAdminRole->id,
            'name'       => 'Super Admin',
            'email'      => 'amomarket.root@gmail.com',
            'password'   => Hash::make('Sameer@0505'),
            'status'     => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        // Create the user
        $user = User::create($userData);

        // Prepare masked password (show first and last character with *** in between)
        $password       = 'Sameer@0505';
        $maskedPassword = substr($password, 0, 1).'****'.substr($password, -1);

        // Send registration email
        try {
            Mail::to($user->email)->queue(new RegistrationMail($user->email, $maskedPassword));
            $this->command->info('Registration email sent to: '.$user->email);
        } catch (\Exception $e) {
            $this->command->error('Failed to send email: '.$e->getMessage());
        }
    }
}
