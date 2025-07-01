<?php

namespace Database\Seeders;

use App\Models\Shop;
use App\Models\ShopType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ShopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Get shop types for reference
        $groceryType        = ShopType::where('name', 'Grocery Store')->first();
        $vegetableType      = ShopType::where('name', 'Fruits & Vegetables Vendor')->first();
        $pharmaType         = ShopType::where('name', 'Pharmacy/Medical Store')->first();
        $restaurantType     = ShopType::where('name', 'Street Food Vendor')->first();
        $fashionType        = ShopType::where('name', 'Readymade Garments Shop')->first();
        $internetCafeType   = ShopType::where('name', 'Internet Café')->first();
        $salonType          = ShopType::where('name', 'Salon / Barber Shop')->first();
        $mobileRepairType   = ShopType::where('name', 'Mobile Repair Shop')->first();
        $acServiceType      = ShopType::where('name', 'AC Service Center')->first();
        $beautyParlorType   = ShopType::where('name', 'Beauty Parlor')->first();
        $carServiceType     = ShopType::where('name', 'Car Service Center')->first();
        $tvRepairType       = ShopType::where('name', 'TV Repair Services')->first();
        $homeAppliancesType = ShopType::where('name', 'Home Appliances Store')->first();

        $shops = [
            // Existing shops with added shop_type_id
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Parivar',
                'shop_type_id'    => $groceryType->id,
                'number'          => '7008392883',
                'image'           => Storage::disk('public')->url('shop/main_image/grocery.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/grocery.webp'),
                'rating'          => 4.2,
                'review'          => null,
                'time'            => '10-15 mins',
                'offer'           => 'ITEMS AT ₹10',
                'description'     => 'Atta, Rice, Dal and all grocery items available',
                'location'        => 'Remuna Golei | ରେମୁଣା ଗୋଲେଇ, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Gopaljue Medical',
                'shop_type_id'    => $pharmaType->id,
                'number'          => '7008392843',
                'image'           => Storage::disk('public')->url('shop/main_image/pharmacy.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/pharmacy.webp'),
                'rating'          => 4.5,
                'review'          => null,
                'time'            => '10-15 mins',
                'offer'           => 'ITEMS AT ₹25',
                'description'     => 'All medicines available including Paracetamol, cold medicines, pain relievers',
                'location'        => 'Remuna Golei | ରେମୁଣା ଗୋଲେଇ, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Jagannath vegetable',
                'shop_type_id'    => $vegetableType->id,
                'number'          => '7008392873',
                'image'           => Storage::disk('public')->url('shop/main_image/vegetable.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/vegetable.webp'),
                'rating'          => 3.8,
                'review'          => null,
                'time'            => '10-15 mins',
                'offer'           => 'ITEMS AT ₹10',
                'description'     => 'all vegetable items available',
                'location'        => 'Remuna Golei | ରେମୁଣା ଗୋଲେଇ, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Basanti Biryani',
                'shop_type_id'    => $restaurantType->id,
                'number'          => '7008492383',
                'image'           => Storage::disk('public')->url('shop/main_image/biryani.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/biryani.webp'),
                'rating'          => 4.3,
                'review'          => null,
                'time'            => '15-20 mins',
                'offer'           => 'ITEMS AT ₹50',
                'description'     => 'Authentic Hyderabadi biryani, Chinese, Asian, Tibetan cuisine',
                'location'        => 'Remuna Golei | ରେମୁଣା ଗୋଲେଇ, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Fashon Style',
                'shop_type_id'    => $fashionType->id,
                'number'          => '7108362883',
                'image'           => Storage::disk('public')->url('shop/main_image/dress_store.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/dress_store.webp'),
                'rating'          => 4.0,
                'review'          => null,
                'time'            => '10-15 mins',
                'offer'           => 'ITEMS AT ₹199',
                'description'     => 'Latest fashion trends - Tshirts, Kurtas, Jeans, Ethnic wear',
                'location'        => 'Remuna Golei | ରେମୁଣା ଗୋଲେଇ, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Namarta Internet',
                'shop_type_id'    => $internetCafeType->id,
                'number'          => '7008792183',
                'image'           => Storage::disk('public')->url('shop/main_image/printout.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/printout.webp'),
                'rating'          => 3.5,
                'review'          => null,
                'time'            => '10-15 mins',
                'offer'           => 'ITEMS AT ₹10',
                'description'     => 'Internet services, printing, scanning, photocopy, DTP work',
                'location'        => 'Remuna Golei | ରେମୁଣା ଗୋଲେଇ, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],

            // New service-providing shops
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Style & Glam Salon',
                'shop_type_id'    => $salonType->id,
                'number'          => '7008392999',
                'image'           => Storage::disk('public')->url('shop/main_image/salon_profile.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/salon_profile.webp'),
                'rating'          => 4.7,
                'review'          => 'Best salon in town with professional stylists',
                'time'            => 'By appointment',
                'offer'           => 'HAIRCUT AT ₹99',
                'description'     => 'Professional hair styling, coloring, makeup, facial, waxing and other beauty services',
                'location'        => 'Near Remuna Police Station, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Mobile Care Solutions',
                'shop_type_id'    => $mobileRepairType->id,
                'number'          => '7008392777',
                'image'           => Storage::disk('public')->url('shop/main_image/mobile_repair.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/mobile_repair.webp'),
                'rating'          => 4.2,
                'review'          => 'Quick and reliable mobile repair services',
                'time'            => '30-45 mins',
                'offer'           => 'SCREEN REPAIR FROM ₹999',
                'description'     => 'Mobile phone repair, screen replacement, battery replacement, software issues',
                'location'        => 'Opposite Remuna High School, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],

            // New AC Service shop
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Cool Breeze AC Services',
                'shop_type_id'    => $acServiceType->id,
                'number'          => '7008392555',
                'image'           => Storage::disk('public')->url('shop/main_image/ac_service.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/ac_service.webp'),
                'rating'          => 4.6,
                'review'          => 'Professional AC installation and repair services',
                'time'            => 'Same day service',
                'offer'           => 'AC SERVICE AT ₹499',
                'description'     => 'AC installation, gas refill, repair, maintenance, and annual service contracts',
                'location'        => 'Near Remuna Bus Stand, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],

            // New Beauty Parlor shop
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Queen Beauty Parlor',
                'shop_type_id'    => $beautyParlorType->id,
                'number'          => '7008392444',
                'image'           => Storage::disk('public')->url('shop/main_image/beauty_parlor.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/beauty_parlor.webp'),
                'rating'          => 4.8,
                'review'          => 'Best bridal makeup and beauty services in town',
                'time'            => 'By appointment',
                'offer'           => 'BRIDAL MAKEUP FROM ₹2999',
                'description'     => 'Bridal makeup, facials, hair treatments, waxing, threading, and complete beauty services',
                'location'        => 'Main Road, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],

            // New Car Service shop
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Remuna Auto Care',
                'shop_type_id'    => $carServiceType->id,
                'number'          => '7008392333',
                'image'           => Storage::disk('public')->url('shop/main_image/car_service.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/car_service.webp'),
                'rating'          => 4.4,
                'review'          => 'Trusted car service center with genuine parts',
                'time'            => '1-2 days',
                'offer'           => 'FREE CAR WASH WITH SERVICE',
                'description'     => 'Car servicing, repairs, denting-painting, wheel alignment, AC service, and all car maintenance',
                'location'        => 'Industrial Area, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],

            // New Home Appliances shop
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'HomeTech Appliances',
                'shop_type_id'    => $homeAppliancesType->id,
                'number'          => '7008392222',
                'image'           => Storage::disk('public')->url('shop/main_image/home_appliances.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/home_appliances.webp'),
                'rating'          => 4.3,
                'review'          => 'Excellent after-sales service and support',
                'time'            => 'Next day service',
                'offer'           => 'FREE INSTALLATION',
                'description'     => 'Sales and service of all home appliances - washing machines, refrigerators, microwaves, etc.',
                'location'        => 'Market Complex, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],

            // New TV Repair shop
            [
                'id'              => (string) Str::uuid(),
                'name'            => 'Vision TV Services',
                'shop_type_id'    => $tvRepairType->id,
                'number'          => '7008392111',
                'image'           => Storage::disk('public')->url('shop/main_image/tv_services.webp'),
                'profile_picture' => Storage::disk('public')->url('shop/profile_picture/tv_services.webp'),
                'rating'          => 4.1,
                'review'          => 'Quick TV repair at reasonable prices',
                'time'            => 'Same day service',
                'offer'           => 'TV REPAIR FROM ₹799',
                'description'     => 'TV repair, installation, panel replacement, and all TV related services for all brands',
                'location'        => 'Near Post Office, Kalidaspur, Balia, Remuna, Odisha, India',
                'latitude'        => '21.5143459',
                'longitude'       => '86.8929264',
                'online_status'   => 1,
                'status'          => 1,
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
        ];

        Shop::insert($shops);
    }
}
