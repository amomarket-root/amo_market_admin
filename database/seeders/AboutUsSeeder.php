<?php

namespace Database\Seeders;

use App\Models\AboutUs;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AboutUsSeeder extends Seeder
{
    public function run()
    {
        $path = 'about_us/about_us.webp';
        AboutUs::create([
            'id'      => (string) Str::uuid(),
            'title'   => 'About Us',
            'content' => json_encode([
                'Welcome to Amo Market, your trusted partner in fast and reliable delivery services. We are dedicated to connecting local shops and markets with end-users, ensuring that you get the freshest and highest-quality products right at your doorstep.',
                'Our mission is to make your life easier by providing a seamless platform where you can purchase everyday essentials like vegetables, groceries, fruits, and more. Whether you are looking for fresh produce or pantry staples, we bring the market to you.',
                'At Amo Market, we believe in supporting local businesses and communities. By partnering with nearby shops and markets, we not only ensure quick delivery but also contribute to the growth of local economies.',
                'Our team is passionate about innovation and customer satisfaction. We are constantly working to improve our platform and services to meet your needs. With Instant Delivery , you can enjoy the convenience of shopping from home while supporting your local community.',
                'Thank you for choosing Amo Market. We look forward to serving you and making your shopping experience effortless and enjoyable.',
            ]),
            'image_path' => Storage::disk('public')->url($path),
        ]);
    }
}
