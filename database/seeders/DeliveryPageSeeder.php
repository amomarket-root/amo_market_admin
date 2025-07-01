<?php

namespace Database\Seeders;

use App\Models\DeliveryPage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DeliveryPageSeeder extends Seeder
{
    public function run()
    {
        $path = 'delivery_page/delivery_page.webp';
        DeliveryPage::create([
            'id'         => (string) Str::uuid(),
            'title'      => 'Join Our Team as a Delivery Partner!',
            'content'    => 'We offer fast and reliable delivery services to all locations, and we are looking for motivated individuals to be a part of our growing network. As a delivery boy, you will play a key role in ensuring our customers receive their orders on time and with care. Enjoy flexible working hours, competitive pay, and the opportunity to be part of a dynamic and supportive team. Whether you are looking for a full-time job or part-time work, we welcome you to join us and help make deliveries faster and more efficient for everyone.',
            'image_path' => Storage::disk('public')->url($path),
            'video_url'  => null,
            'link'       => 'https://delivery.amomarket.in',
            'is_active'  => true,
        ]);
    }
}
