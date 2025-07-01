<?php

namespace Database\Seeders;

use App\Models\AdvisementPage;
use App\Models\Shop;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdvisementPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get the relevant shops
        $gopaljueMedical    = Shop::where('name', 'Gopaljue Medical')->first();
        $jagannathVegetable = Shop::where('name', 'Jagannath vegetable')->first();
        $namartaInternet    = Shop::where('name', 'Namarta Internet')->first();
        $parivar            = Shop::where('name', 'Parivar')->first();
        $basantiBiryani     = Shop::where('name', 'Basanti Biryani')->first();
        $queenBeautyParlor  = Shop::where('name', 'Queen Beauty Parlor')->first();
        $styleGlamSalon     = Shop::where('name', 'Style & Glam Salon')->first();

        $advisementPages = [
            [
                'id'            => (string) Str::uuid(),
                'shop_id'       => $gopaljueMedical ? $gopaljueMedical->id : null,
                'title'         => 'Pharmacy at your doorstep!',
                'content_image' => Storage::disk('public')->url('advisement/pharmacy.webp'),
                'description'   => 'Cough syrups, Pain relief, Sprays & More',
                'status'        => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'id'            => (string) Str::uuid(),
                'shop_id'       => $jagannathVegetable ? $jagannathVegetable->id : null,
                'title'         => 'Vegetable delivery in minutes',
                'content_image' => Storage::disk('public')->url('advisement/vegetable.webp'),
                'description'   => 'Fresh vegetables & more',
                'status'        => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'id'            => (string) Str::uuid(),
                'shop_id'       => $namartaInternet ? $namartaInternet->id : null,
                'title'         => 'Get printouts in minutes',
                'content_image' => Storage::disk('public')->url('advisement/printout.webp'),
                'description'   => 'Safe & Secure, Convenient & Fast',
                'status'        => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'id'            => (string) Str::uuid(),
                'shop_id'       => $parivar ? $parivar->id : null,
                'title'         => 'Get groceries in minutes',
                'content_image' => Storage::disk('public')->url('advisement/grocery.webp'),
                'description'   => 'All groceries & more',
                'status'        => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'id'            => (string) Str::uuid(),
                'shop_id'       => $basantiBiryani ? $basantiBiryani->id : null,
                'title'         => 'Get your food delivered in minutes',
                'content_image' => Storage::disk('public')->url('advisement/food.webp'),
                'description'   => 'Order from your favorite restaurants',
                'status'        => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'id'            => (string) Str::uuid(),
                'shop_id'       => $queenBeautyParlor ? $queenBeautyParlor->id : null,
                'title'         => 'Beauty care at your home',
                'content_image' => Storage::disk('public')->url('advisement/beauty_parlor.webp'),
                'description'   => 'Facials, waxing, threading & more',
                'status'        => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'id'            => (string) Str::uuid(),
                'shop_id'       => $styleGlamSalon ? $styleGlamSalon->id : null,
                'title'         => 'Salon services at your convenience',
                'content_image' => Storage::disk('public')->url('advisement/salon.webp'),
                'description'   => 'Haircuts, styling, grooming & more',
                'status'        => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ];

        AdvisementPage::insert($advisementPages);
    }
}
