<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ContactUsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('contact_us')->insert([
            'id'            => (string) Str::uuid(),
            'company_name'  => 'Amo Market',
            'address_line1' => 'Hatyagand Choka',
            'address_line2' => 'Remuna, Balasore',
            'city'          => 'Balasore',
            'state'         => 'Odisha',
            'postal_code'   => '756019',
            'phone_numbers' => '+91 7008392889, 7381883483',
            'email'         => 'info.amomarket@gmail.com',
            'social_media'  => json_encode([
                'facebook'  => '#',
                'instagram' => '#',
                'youtube'   => '#',
                'linkedin'  => '#',
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
