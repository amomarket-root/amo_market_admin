<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SubcategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get all needed categories
        $dairyCategory         = Category::where('name', 'Dairy, Bread & Egg')->first();
        $snacksCategory        = Category::where('name', 'Snacks & Munchies')->first();
        $drinksCategory        = Category::where('name', 'Cold Drinks & Juices')->first();
        $printingCategory      = Category::where('name', 'Printing Services')->first();
        $acServiceCategory     = Category::where('name', 'AC Services')->first();
        $beautyParlorCategory  = Category::where('name', 'Beauty Parlor')->first();
        $carServiceCategory    = Category::where('name', 'Car Services')->first();
        $homeApplianceCategory = Category::where('name', 'Home Appliances')->first();
        $mensSalonCategory     = Category::where('name', 'Men\'s Salon')->first();
        $mobileRepairCategory  = Category::where('name', 'Mobile Repair')->first();
        $tvRepairCategory      = Category::where('name', 'TV Repair')->first();
        $subcategories         = [];

        /* ---------------------------- Product Subcategories ---------------------------- */

        // Dairy, Bread & Egg subcategories
        if ($dairyCategory) {
            $subcategories = array_merge($subcategories, [
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Milk',
                    'image'        => Storage::disk('public')->url('subcategories/Milk.png'),
                    'description'  => 'Fresh dairy milk in various fat percentages. Includes cow milk, buffalo milk, and flavored milk options.',
                    'product_code' => 'DBE001',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Bread & Pav',
                    'image'        => Storage::disk('public')->url('subcategories/Bread.png'),
                    'description'  => 'Freshly baked breads including white, brown, multigrain, and pav buns for your daily needs.',
                    'product_code' => 'DBE002',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Eggs',
                    'image'        => Storage::disk('public')->url('subcategories/Egg.png'),
                    'description'  => 'Farm fresh eggs including country eggs, white eggs, and brown eggs in various pack sizes.',
                    'product_code' => 'DBE003',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Butter & More',
                    'image'        => Storage::disk('public')->url('subcategories/Butter.png'),
                    'description'  => 'Dairy butter, margarine, ghee, and other dairy spreads in various pack sizes.',
                    'product_code' => 'DBE005',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Cheese',
                    'image'        => Storage::disk('public')->url('subcategories/Cheese.png'),
                    'description'  => 'Variety of cheeses including processed cheese, mozzarella, cheddar, and cheese slices.',
                    'product_code' => 'DBE006',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Cream & Whitener',
                    'image'        => Storage::disk('public')->url('subcategories/Cream_whitenear.png'),
                    'description'  => 'Fresh cream, dairy whitener, and coffee creamers for your culinary needs.',
                    'product_code' => 'DBE007',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Curd & Lassi',
                    'image'        => Storage::disk('public')->url('subcategories/Lassi.png'),
                    'description'  => 'Fresh curd, lassi, and buttermilk in various flavors and pack sizes.',
                    'product_code' => 'DBE008',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Yogurt & Curd',
                    'image'        => Storage::disk('public')->url('subcategories/Yogurt.png'),
                    'description'  => 'Fresh yogurt, curd, and probiotic drinks in various flavors and sizes.',
                    'product_code' => 'DBE009',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Paneer & Tofu',
                    'image'        => Storage::disk('public')->url('subcategories/Paneer.png'),
                    'description'  => 'Fresh paneer, tofu, and other dairy-based protein options.',
                    'product_code' => 'DBE010',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        // Snacks & Munchies subcategory (Chips & Crisps)
        if ($snacksCategory) {
            $subcategories = array_merge($subcategories, [
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $snacksCategory->id,
                    'name'         => 'Chips & Crisps',
                    'image'        => Storage::disk('public')->url('subcategories/Chips.png'),
                    'description'  => 'Crunchy potato chips, corn chips, and other crispy snacks in various flavors and pack sizes.',
                    'product_code' => 'SNK001',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        // Cold Drinks & Juices subcategory (Soft Drinks)
        if ($drinksCategory) {
            $subcategories = array_merge($subcategories, [
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $drinksCategory->id,
                    'name'         => 'Soft Drinks',
                    'image'        => Storage::disk('public')->url('subcategories/Soft_Drinks.png'),
                    'description'  => 'Refreshing carbonated soft drinks in various flavors and bottle sizes.',
                    'product_code' => 'CDJ001',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        /* ---------------------------- Service Subcategories ---------------------------- */

        // Printing Services subcategories
        if ($printingCategory) {
            $subcategories = array_merge($subcategories, [
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $printingCategory->id,
                    'name'         => 'Printing & Other Services',
                    'image'        => Storage::disk('public')->url('service_subcategories/document_printing.webp'),
                    'description'  => 'Professional printing solutions for documents, photos, and promotional materials, along with a range of support services to meet your personal and business needs.',
                    'product_code' => 'PRT-001',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        // AC service subcategories
        if ($acServiceCategory) {
            $subcategories = array_merge($subcategories, [
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $acServiceCategory->id,
                    'name'         => 'AC Install & Services',
                    'image'        => Storage::disk('public')->url('service_subcategories/ac_services.webp'),
                    'description'  => 'Professional installation and setup of your air conditioner to ensure optimal performance, safety, and efficiency. Includes mounting, connections, and basic testing.',
                    'product_code' => 'AC-301',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        // Beauty parlor subcategories
        if ($beautyParlorCategory) {
            $subcategories = array_merge($subcategories, [
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $beautyParlorCategory->id,
                    'name'         => 'Beauty Salon & Services',
                    'image'        => Storage::disk('public')->url('service_subcategories/beauty_services.webp'),
                    'description'  => 'Comprehensive grooming and beauty care including hair styling, skincare, makeup, and spa treatments—designed to enhance your look and refresh your senses.',
                    'product_code' => 'BEAUTY-301',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        // Car service subcategories
        if ($carServiceCategory) {
            $subcategories = array_merge($subcategories, [
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $carServiceCategory->id,
                    'name'         => 'Car Service & Detailing',
                    'image'        => Storage::disk('public')->url('service_subcategories/car_service.webp'),
                    'description'  => 'Complete vehicle care, from routine maintenance to deep cleaning and polishing—ensuring your car runs smoothly and looks showroom-ready inside and out.',
                    'product_code' => 'CAR-201',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        // Home appliance subcategories
        if ($homeApplianceCategory) {
            $subcategories = array_merge($subcategories, [
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $homeApplianceCategory->id,
                    'name'         => 'Home Appliance Repair & Services',
                    'image'        => Storage::disk('public')->url('service_subcategories/home_appliance.webp'),
                    'description'  => 'Expert repair and maintenance for all major home appliances—ensuring efficient performance and extending the life of your devices like refrigerators, washing machines, and more.',
                    'product_code' => 'HOME-101',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        // Men's salon subcategories
        if ($mensSalonCategory) {
            $subcategories = array_merge($subcategories, [
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $mensSalonCategory->id,
                    'name'         => 'Men\'s Salon & Services',
                    'image'        => Storage::disk('public')->url('service_subcategories/mens_salon.webp'),
                    'description'  => 'Grooming and styling services tailored for men, including haircuts, beard styling, facials, and more—designed for a sharp, refreshed look.',
                    'product_code' => 'SALOON-101',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        // Mobile repair subcategories
        if ($mobileRepairCategory) {
            $subcategories = array_merge($subcategories, [
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $mobileRepairCategory->id,
                    'name'         => 'Mobile Repair & Services',
                    'image'        => Storage::disk('public')->url('service_subcategories/mobile_repair.webp'),
                    'description'  => 'iPhone screen replacement services',
                    'product_code' => 'REP-301',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        // Electronics repair subcategories
        if ($tvRepairCategory) {
            $subcategories = array_merge($subcategories, [
                [
                    'id'           => (string) Str::uuid(),
                    'category_id'  => $tvRepairCategory->id ?? null,
                    'name'         => 'TV Repair & Services',
                    'image'        => Storage::disk('public')->url('service_subcategories/tv_repair.webp'),
                    'description'  => 'TV Repair & Services provide expert diagnosis and repair of all types of televisions, including LED, LCD, Smart TVs, and Plasma models. Whether it\'s a display issue, sound problem, connectivity fault, or power failure, trained technicians ensure fast and reliable service—either at home or at a service center—to restore your TV to perfect working condition.',
                    'product_code' => 'ELEC-401',
                    'status'       => 1,
                    'created_at'   => now(),
                    'updated_at'   => now(),
                ],
            ]);
        }

        // Insert all subcategories
        if (! empty($subcategories)) {
            SubCategory::insert($subcategories);
        }
    }
}
