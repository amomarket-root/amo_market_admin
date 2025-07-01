<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Shop;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategorySeederBackup extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        // Get all shops by their type
        $groceryShop      = Shop::where('name', 'Patra Grosery')->first();
        $medicalShop      = Shop::where('name', 'Gopaljue Medical')->first();
        $restaurantShop   = Shop::where('name', 'Basanti Biryani')->first();
        $fashionShop      = Shop::where('name', 'Fashon Style')->first();
        $internetShop     = Shop::where('name', 'Namarta Internet')->first();
        $salonShop        = Shop::where('name', 'Style & Glam Salon')->first();
        $mobileRepairShop = Shop::where('name', 'Mobile Care Solutions')->first();
        $electronicsShop  = Shop::where('name', 'Tech Guru Electronics')->first();

        $categories = [];

        // Grocery Store Categories
        if ($groceryShop) {
            $groceryCategories = [
                [
                    'shop_id'       => $groceryShop->id,
                    'name'          => 'Dairy, Bread & Eggs',
                    'description'   => 'Fresh dairy products, breads and eggs',
                    'content_image' => Storage::disk('public')->url('categories/dairy_bread_eggs.png'),
                    'image'         => Storage::disk('public')->url('categories/single/dairy_bread_eggs.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $groceryShop->id,
                    'name'          => 'Atta, Rice & Dal',
                    'description'   => 'All types of grains and pulses',
                    'content_image' => Storage::disk('public')->url('categories/atta_rice_dal.png'),
                    'image'         => Storage::disk('public')->url('categories/single/atta_rice_dal.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $groceryShop->id,
                    'name'          => 'Masala, Oil & More',
                    'description'   => 'Spices, oils and cooking essentials',
                    'content_image' => Storage::disk('public')->url('categories/masala_oil_more.png'),
                    'image'         => Storage::disk('public')->url('categories/single/masala_oil_more.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $groceryShop->id,
                    'name'          => 'Snacks & Munchies',
                    'description'   => 'Chips, biscuits and ready-to-eat snacks',
                    'content_image' => Storage::disk('public')->url('categories/snacks_munchies.png'),
                    'image'         => Storage::disk('public')->url('categories/single/snacks_munchies.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $groceryCategories);
        }

        // Medical Store Categories
        if ($medicalShop) {
            $medicalCategories = [
                [
                    'shop_id'       => $medicalShop->id,
                    'name'          => 'Medicines',
                    'description'   => 'Allopathic medicines and prescriptions',
                    'content_image' => Storage::disk('public')->url('categories/medicines.png'),
                    'image'         => Storage::disk('public')->url('categories/single/medicines.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $medicalShop->id,
                    'name'          => 'Wellness Products',
                    'description'   => 'Vitamins and health supplements',
                    'content_image' => Storage::disk('public')->url('categories/wellness.png'),
                    'image'         => Storage::disk('public')->url('categories/single/wellness.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $medicalShop->id,
                    'name'          => 'First Aid',
                    'description'   => 'Bandages, antiseptics and first aid kits',
                    'content_image' => Storage::disk('public')->url('categories/first_aid.png'),
                    'image'         => Storage::disk('public')->url('categories/single/first_aid.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $medicalCategories);
        }

        // Restaurant Categories
        if ($restaurantShop) {
            $restaurantCategories = [
                [
                    'shop_id'       => $restaurantShop->id,
                    'name'          => 'Biryani',
                    'description'   => 'Authentic Hyderabadi biryanis',
                    'content_image' => Storage::disk('public')->url('categories/biryani.png'),
                    'image'         => Storage::disk('public')->url('categories/single/biryani.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $restaurantShop->id,
                    'name'          => 'Chinese',
                    'description'   => 'Popular Chinese dishes',
                    'content_image' => Storage::disk('public')->url('categories/chinese.png'),
                    'image'         => Storage::disk('public')->url('categories/single/chinese.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $restaurantShop->id,
                    'name'          => 'Tibetan',
                    'description'   => 'Authentic Tibetan cuisine',
                    'content_image' => Storage::disk('public')->url('categories/tibetan.png'),
                    'image'         => Storage::disk('public')->url('categories/single/tibetan.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $restaurantCategories);
        }

        // Fashion Store Categories
        if ($fashionShop) {
            $fashionCategories = [
                [
                    'shop_id'       => $fashionShop->id,
                    'name'          => 'Men\'s Wear',
                    'description'   => 'Shirts, t-shirts and jeans for men',
                    'content_image' => Storage::disk('public')->url('categories/mens_wear.png'),
                    'image'         => Storage::disk('public')->url('categories/single/mens_wear.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $fashionShop->id,
                    'name'          => 'Women\'s Wear',
                    'description'   => 'Kurtas, sarees and western wear',
                    'content_image' => Storage::disk('public')->url('categories/womens_wear.png'),
                    'image'         => Storage::disk('public')->url('categories/single/womens_wear.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $fashionShop->id,
                    'name'          => 'Kids Wear',
                    'description'   => 'Clothing for children',
                    'content_image' => Storage::disk('public')->url('categories/kids_wear.png'),
                    'image'         => Storage::disk('public')->url('categories/single/kids_wear.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $fashionCategories);
        }

        // Service Shop Categories
        if ($salonShop) {
            $salonCategories = [
                [
                    'shop_id'       => $salonShop->id,
                    'name'          => 'Hair Services',
                    'description'   => 'Cutting, styling and coloring',
                    'content_image' => Storage::disk('public')->url('service_categories/hair_services.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/hair_services.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $salonShop->id,
                    'name'          => 'Skin Care',
                    'description'   => 'Facials and treatments',
                    'content_image' => Storage::disk('public')->url('service_categories/skin_care.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/skin_care.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $salonShop->id,
                    'name'          => 'Makeup',
                    'description'   => 'Bridal and party makeup',
                    'content_image' => Storage::disk('public')->url('service_categories/makeup.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/makeup.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $salonCategories);
        }

        if ($mobileRepairShop) {
            $repairCategories = [
                [
                    'shop_id'       => $mobileRepairShop->id,
                    'name'          => 'Screen Replacement',
                    'description'   => 'All mobile screen repairs',
                    'content_image' => Storage::disk('public')->url('service_categories/screen_repair.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/screen_repair.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $mobileRepairShop->id,
                    'name'          => 'Battery Replacement',
                    'description'   => 'Original and compatible batteries',
                    'content_image' => Storage::disk('public')->url('service_categories/battery.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/battery.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $mobileRepairShop->id,
                    'name'          => 'Software Issues',
                    'description'   => 'Virus removal and OS problems',
                    'content_image' => Storage::disk('public')->url('service_categories/software.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/software.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $repairCategories);
        }

        if ($electronicsShop) {
            $electronicsCategories = [
                [
                    'shop_id'       => $electronicsShop->id,
                    'name'          => 'TV Repair',
                    'description'   => 'LED and LCD TV services',
                    'content_image' => Storage::disk('public')->url('service_categories/tv_repair.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/tv_repair.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $electronicsShop->id,
                    'name'          => 'AC Service',
                    'description'   => 'Installation and maintenance',
                    'content_image' => Storage::disk('public')->url('service_categories/ac_service.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/ac_service.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $electronicsShop->id,
                    'name'          => 'Home Appliances',
                    'description'   => 'Washing machine, fridge repairs',
                    'content_image' => Storage::disk('public')->url('service_categories/home_appliances.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/home_appliances.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $electronicsCategories);
        }

        // Internet Cafe Categories
        if ($internetShop) {
            $internetCategories = [
                [
                    'shop_id'       => $internetShop->id,
                    'name'          => 'Printing Services',
                    'description'   => 'Document printing and copying',
                    'content_image' => Storage::disk('public')->url('service_categories/printing.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/printing.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $internetShop->id,
                    'name'          => 'Internet Access',
                    'description'   => 'High-speed internet browsing',
                    'content_image' => Storage::disk('public')->url('service_categories/internet.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/internet.png'),
                    'status'        => '1',
                ],
                [
                    'shop_id'       => $internetShop->id,
                    'name'          => 'DTP Services',
                    'description'   => 'Document design and formatting',
                    'content_image' => Storage::disk('public')->url('service_categories/dtp.png'),
                    'image'         => Storage::disk('public')->url('service_categories/single/dtp.png'),
                    'status'        => '1',
                ],
            ];
            $categories = array_merge($categories, $internetCategories);
        }

        // Add timestamps and UUIDs
        foreach ($categories as &$category) {
            $category['id']         = (string) Str::uuid();
            $category['created_at'] = now();
            $category['updated_at'] = now();
        }

        Category::insert($categories);
    }
}
