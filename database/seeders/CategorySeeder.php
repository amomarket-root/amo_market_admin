<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Shop;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get all shops
        $patraGrocery        = Shop::where('name', 'Parivar')->first();
        $gopaljueMedical     = Shop::where('name', 'Gopaljue Medical')->first();
        $jagannathVegetable  = Shop::where('name', 'Jagannath vegetable')->first();
        $basantiBiryani      = Shop::where('name', 'Basanti Biryani')->first();
        $fashionStyle        = Shop::where('name', 'Fashon Style')->first();
        $namartaInternet     = Shop::where('name', 'Namarta Internet')->first();
        $styleGlamSalon      = Shop::where('name', 'Style & Glam Salon')->first();
        $mobileCareSolutions = Shop::where('name', 'Mobile Care Solutions')->first();
        $coolBreezeAc        = Shop::where('name', 'Cool Breeze AC Services')->first();
        $queenBeautyParlor   = Shop::where('name', 'Queen Beauty Parlor')->first();
        $remunaAutoCare      = Shop::where('name', 'Remuna Auto Care')->first();
        $homeTechAppliances  = Shop::where('name', 'HomeTech Appliances')->first();
        $visionTvServices    = Shop::where('name', 'Vision TV Services')->first();

        $categories = [];

        // Grocery Store Categories (Patra Grosery)
        if ($patraGrocery) {
            $groceryCategories = [
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Paan Corner',
                    'description'   => 'Shop a variety of paan, mouth fresheners, and related products.',
                    'content_image' => Storage::disk('public')->url('categories/paan_corner.png'),
                    'image'         => Storage::disk('public')->url('categories/single/paan_corner.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Dairy, Bread & Egg',
                    'description'   => 'Fresh dairy products, breads, and eggs for your daily needs.',
                    'content_image' => Storage::disk('public')->url('categories/dairy_bread_eggs.png'),
                    'image'         => Storage::disk('public')->url('categories/single/dairy_bread_eggs.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Cold Drinks & Juices',
                    'description'   => 'Refreshing cold drinks and healthy fruit juices.',
                    'content_image' => Storage::disk('public')->url('categories/colddrinks_juices.png'),
                    'image'         => Storage::disk('public')->url('categories/single/colddrinks_juices.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Snacks & Munchies',
                    'description'   => 'Crispy snacks and tasty munchies for any time hunger.',
                    'content_image' => Storage::disk('public')->url('categories/snacks_munchies.png'),
                    'image'         => Storage::disk('public')->url('categories/single/snacks_munchies.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Breakfast & Instant Food',
                    'description'   => 'Quick breakfast options and ready-to-eat meals.',
                    'content_image' => Storage::disk('public')->url('categories/breakfast_instantfood.png'),
                    'image'         => Storage::disk('public')->url('categories/single/breakfast_instantfood.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Sweet Tooth',
                    'description'   => 'Delicious sweets, chocolates, and candies.',
                    'content_image' => Storage::disk('public')->url('categories/sweet_tooth.png'),
                    'image'         => Storage::disk('public')->url('categories/single/sweet_tooth.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Bakery & Biscuits',
                    'description'   => 'Freshly baked goods and a variety of biscuits.',
                    'content_image' => Storage::disk('public')->url('categories/bakery_biscuits.png'),
                    'image'         => Storage::disk('public')->url('categories/single/bakery_biscuits.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Tea, Coffee & Health Drink',
                    'description'   => 'Hot beverages and health drinks to keep you energized.',
                    'content_image' => Storage::disk('public')->url('categories/tea_coffee_healthdrink.png'),
                    'image'         => Storage::disk('public')->url('categories/single/tea_coffee_healthdrink.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Atta, Rice & Dal',
                    'description'   => 'Staples like atta, rice, dal and more.',
                    'content_image' => Storage::disk('public')->url('categories/atta_rice_dal.png'),
                    'image'         => Storage::disk('public')->url('categories/single/atta_rice_dal.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Masala, Oil & More',
                    'description'   => 'Essential spices, oils, and cooking ingredients.',
                    'content_image' => Storage::disk('public')->url('categories/masala_oil_more.png'),
                    'image'         => Storage::disk('public')->url('categories/single/masala_oil_more.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Sauces & Spreads',
                    'description'   => 'Tasty sauces, jams, and spreads to enhance your meals.',
                    'content_image' => Storage::disk('public')->url('categories/sauces_spreads.png'),
                    'image'         => Storage::disk('public')->url('categories/single/sauces_spreads.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Chicken, Meat & Fish',
                    'description'   => 'Fresh and frozen chicken, meat, and fish products.',
                    'content_image' => Storage::disk('public')->url('categories/chicken_meat_fish.png'),
                    'image'         => Storage::disk('public')->url('categories/single/chicken_meat_fish.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Organic & Healthy Living',
                    'description'   => 'Organic groceries and products for a healthy lifestyle.',
                    'content_image' => Storage::disk('public')->url('categories/organic_healthy_living.png'),
                    'image'         => Storage::disk('public')->url('categories/single/organic_healthy_living.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Cleaning Essentials',
                    'description'   => 'Household cleaning and sanitizing products.',
                    'content_image' => Storage::disk('public')->url('categories/cleaning_essentials.png'),
                    'image'         => Storage::disk('public')->url('categories/single/cleaning_essentials.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Home & Office',
                    'description'   => 'Home improvement and office utility products.',
                    'content_image' => Storage::disk('public')->url('categories/home_office.png'),
                    'image'         => Storage::disk('public')->url('categories/single/home_office.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Personal Care',
                    'description'   => 'Personal hygiene and grooming products.',
                    'content_image' => Storage::disk('public')->url('categories/personal_care.png'),
                    'image'         => Storage::disk('public')->url('categories/single/personal_care.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $patraGrocery->id,
                    'name'          => 'Pet Care',
                    'description'   => 'Food and essentials for your beloved pets.',
                    'content_image' => Storage::disk('public')->url('categories/pet_care.png'),
                    'image'         => Storage::disk('public')->url('categories/single/pet_care.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $groceryCategories);
        }

        // Pharmacy Categories (Gopaljue Medical)
        if ($gopaljueMedical) {
            $pharmacyCategories = [
                [
                    'shop_id'       => $gopaljueMedical->id,
                    'name'          => 'Baby Care',
                    'description'   => 'Baby essentials like diapers, wipes, and baby food.',
                    'content_image' => Storage::disk('public')->url('categories/baby_care.png'),
                    'image'         => Storage::disk('public')->url('categories/single/baby_care.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $gopaljueMedical->id,
                    'name'          => 'Pharma & Wellness',
                    'description'   => 'Health supplements and over-the-counter medicines.',
                    'content_image' => Storage::disk('public')->url('categories/pharma_wellness.png'),
                    'image'         => Storage::disk('public')->url('categories/single/pharma_wellness.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $pharmacyCategories);
        }

        // Vegetable Shop Categories (Jagannath vegetable)
        if ($jagannathVegetable) {
            $vegetableCategories = [
                [
                    'shop_id'       => $jagannathVegetable->id,
                    'name'          => 'Fruits & Vegetables',
                    'description'   => 'Fresh fruits and vegetables sourced daily.',
                    'content_image' => Storage::disk('public')->url('categories/fruits_vegetables.png'),
                    'image'         => Storage::disk('public')->url('categories/single/fruits_vegetables.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $vegetableCategories);
        }

        // Restaurant Categories (Basanti Biryani)
        if ($basantiBiryani) {
            $restaurantCategories = [
                [
                    'shop_id'       => $basantiBiryani->id,
                    'name'          => 'Delicious Dishes',
                    'description'   => 'A mouth-watering selection of biryani, noodles, and chicken pakoda.',
                    'content_image' => Storage::disk('public')->url('categories/delicious_dishes.png'),
                    'image'         => Storage::disk('public')->url('categories/single/delicious_dishes.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $restaurantCategories);
        }

        // Fashion Store Categories (Fashon Style)
        if ($fashionStyle) {
            $fashionCategories = [
                [
                    'shop_id'       => $fashionStyle->id,
                    'name'          => 'Stylish Wear',
                    'description'   => 'Fashionable clothing for men, women, and kids - all in one place.',
                    'content_image' => Storage::disk('public')->url('categories/stylish_wear.png'),
                    'image'         => Storage::disk('public')->url('categories/single/stylish_wear.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $fashionCategories);
        }

        // Internet Cafe Categories (Namarta Internet)
        if ($namartaInternet) {
            $internetCategories = [
                [
                    'shop_id'       => $namartaInternet->id,
                    'name'          => 'Printing Services',
                    'description'   => 'Document printing in various sizes and formats.',
                    'content_image' => Storage::disk('public')->url('services/printing_services.webp'),
                    'image'         => Storage::disk('public')->url('services/single/printing_services.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $internetCategories);
        }

        // Salon Categories (Style & Glam Salon)
        if ($styleGlamSalon) {
            $salonCategories = [
                [
                    'shop_id'       => $styleGlamSalon->id,
                    'name'          => 'Men\'s Salon',
                    'description'   => 'Haircuts, shaving and grooming services for men.',
                    'content_image' => Storage::disk('public')->url('services/mens_salon.webp'),
                    'image'         => Storage::disk('public')->url('services/single/mens_salon.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $salonCategories);
        }

        // Mobile Repair Categories (Mobile Care Solutions)
        if ($mobileCareSolutions) {
            $mobileRepairCategories = [
                [
                    'shop_id'       => $mobileCareSolutions->id,
                    'name'          => 'Mobile Repair',
                    'description'   => 'Screen replacement, battery replacement and other repairs.',
                    'content_image' => Storage::disk('public')->url('services/mobile_repair.webp'),
                    'image'         => Storage::disk('public')->url('services/single/mobile_repair.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $mobileRepairCategories);
        }

        // AC Service Categories (Cool Breeze AC Services)
        if ($coolBreezeAc) {
            $acServiceCategories = [
                [
                    'shop_id'       => $coolBreezeAc->id,
                    'name'          => 'AC Services',
                    'description'   => 'AC installation, repair and maintenance services.',
                    'content_image' => Storage::disk('public')->url('services/ac_services.webp'),
                    'image'         => Storage::disk('public')->url('services/single/ac_services.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $acServiceCategories);
        }

        // Beauty Parlor Categories (Queen Beauty Parlor)
        if ($queenBeautyParlor) {
            $beautyParlorCategories = [
                [
                    'shop_id'       => $queenBeautyParlor->id,
                    'name'          => 'Beauty Parlor',
                    'description'   => 'Complete beauty services for women.',
                    'content_image' => Storage::disk('public')->url('services/beauty_parlor.webp'),
                    'image'         => Storage::disk('public')->url('services/single/beauty_parlor.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $beautyParlorCategories);
        }

        // Car Service Categories (Remuna Auto Care)
        if ($remunaAutoCare) {
            $carServiceCategories = [
                [
                    'shop_id'       => $remunaAutoCare->id,
                    'name'          => 'Car Services',
                    'description'   => 'Complete car servicing and repairs.',
                    'content_image' => Storage::disk('public')->url('services/car_services.webp'),
                    'image'         => Storage::disk('public')->url('services/single/car_services.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $carServiceCategories);
        }

        // Home Appliances Categories (HomeTech Appliances)
        if ($homeTechAppliances) {
            $applianceCategories = [
                [
                    'shop_id'       => $homeTechAppliances->id,
                    'name'          => 'Home Appliances',
                    'description'   => 'Sales and service of home appliances.',
                    'content_image' => Storage::disk('public')->url('services/home_appliances.webp'),
                    'image'         => Storage::disk('public')->url('services/single/home_appliances.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $applianceCategories);
        }

        // TV Repair Categories (Vision TV Services)
        if ($visionTvServices) {
            $tvRepairCategories = [
                [
                    'shop_id'       => $visionTvServices->id,
                    'name'          => 'TV Repair',
                    'description'   => 'TV repair services for all brands.',
                    'content_image' => Storage::disk('public')->url('services/tv_repair.webp'),
                    'image'         => Storage::disk('public')->url('services/single/tv_repair.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $tvRepairCategories);
        }

        // Assign UUIDs and timestamps
        foreach ($categories as &$category) {
            $category['id']         = (string) Str::uuid();
            $category['created_at'] = now();
            $category['updated_at'] = now();
        }

        // Insert all categories
        Category::insert($categories);
    }
}
