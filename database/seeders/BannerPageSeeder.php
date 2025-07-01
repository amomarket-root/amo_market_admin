<?php

namespace Database\Seeders;

use App\Models\BannerPage;
use App\Models\Shop;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BannerPageSeeder extends Seeder
{
    public function run()
    {
        $parivar            = Shop::where('name', 'Parivar')->first();
        $jagannathVegetable = Shop::where('name', 'Jagannath vegetable')->first();

        // Just use the URLs for existing files
        $banner1Path = 'banners/singlebanner.webp';
        $banner2Path = 'banners/vegitable_banner.webp';

        $banners = [
            [
                'id'            => (string) Str::uuid(),
                'shop_id'       => $parivar?->id,
                'title'         => 'Paan corner',
                'content_image' => Storage::disk('public')->url($banner1Path),
                'status'        => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'id'            => (string) Str::uuid(),
                'shop_id'       => $jagannathVegetable?->id,
                'title'         => 'Vegetable Store',
                'content_image' => Storage::disk('public')->url($banner2Path),
                'status'        => 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ];

        BannerPage::insert($banners);
    }
}
