<?php

namespace Database\Seeders;

use App\Models\ShopPage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ShopPageSeeder extends Seeder
{
    public function run()
    {
        $path = 'shop_page/shop_page.webp';
        ShopPage::create([
            'id'         => (string) Str::uuid(),
            'title'      => 'Partner with Us as a Retailer or Shop!',
            'content'    => 'We offer fast and reliable delivery services to all locations, and we are inviting shop owners and retailers to join our growing network. By partnering with us, you can expand your reach, boost your sales, and serve more customers without any hassle. Our platform connects your store to a wide customer base and ensures quick, efficient deliveries. Whether you run a grocery store, pharmacy, or local outlet, join us today and grow your business with a trusted delivery partner by your side.',
            'image_path' => Storage::disk('public')->url($path),
            'video_url'  => null,
            'link'       => 'https://shop.amomarket.in',
            'is_active'  => true,
        ]);
    }
}
