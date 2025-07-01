<?php

namespace Database\Seeders;

use App\Models\Career;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CareerSeeder extends Seeder
{
    public function run()
    {
        $path = 'careers/careers.webp';

        Career::create([
            'id'          => (string) Str::uuid(),
            'title'       => 'Marketing Specialist',
            'description' => 'Seeking a creative Marketing Specialist to develop and execute strategies that engage customers and promote our services.',
            'image_path'  => Storage::disk('public')->url($path),
            'benefits'    => json_encode([
                'Opportunities for professional development',
                'Dynamic work environment',
                'Competitive salaries',
                'Make a real impact',
            ]),
        ]);

        Career::create([
            'id'          => (string) Str::uuid(),
            'title'       => 'Software Developer',
            'description' => 'Join us as a Software Developer to build scalable solutions and enhance user experiences with cutting-edge technology.',
            'sort_order'  => 1,
        ]);

        Career::create([
            'id'          => (string) Str::uuid(),
            'title'       => 'Customer Support Executive',
            'description' => 'Looking for skilled communicators to assist our users with top-notch support.',
            'sort_order'  => 2,
        ]);

        Career::create([
            'id'          => (string) Str::uuid(),
            'title'       => 'Delivery Partner',
            'description' => 'Ensure timely deliveries with flexible hours and competitive earnings.',
            'sort_order'  => 3,
        ]);
    }
}
