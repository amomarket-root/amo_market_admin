<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ShopTypeSeeder extends Seeder
{
    public function run()
    {
        $types = [
            ['name' => 'Grocery Store', 'has_services' => false],
            ['name' => 'Kirana Store', 'has_services' => false],
            ['name' => 'Fruits & Vegetables Vendor', 'has_services' => false],
            ['name' => 'Dairy Products', 'has_services' => false],
            ['name' => 'Meat & Fish Shop', 'has_services' => false],
            ['name' => 'Bakery', 'has_services' => false],
            ['name' => 'Dry Fruits & Spices Shop', 'has_services' => false],
            ['name' => 'Readymade Garments Shop', 'has_services' => false],
            ['name' => 'Saree/Ethnic Wear Store', 'has_services' => false],
            ['name' => 'Tailor Shop', 'has_services' => true],
            ['name' => 'Footwear Shop', 'has_services' => false],
            ['name' => 'Jewelry Shop', 'has_services' => true],
            ['name' => 'Watch Store', 'has_services' => true],
            ['name' => 'Bag & Purse Shop', 'has_services' => false],
            ['name' => 'Crockery & Utensils Store', 'has_services' => false],
            ['name' => 'Home Appliances Store', 'has_services' => true],
            ['name' => 'Furniture Shop', 'has_services' => false],
            ['name' => 'Plastic & Steel Items Shop', 'has_services' => false],
            ['name' => 'Mattress & Bedding Store', 'has_services' => false],
            ['name' => 'Stationery & Book Store', 'has_services' => false],
            ['name' => 'Pharmacy/Medical Store', 'has_services' => false],
            ['name' => 'Ayurvedic Medicine Shop', 'has_services' => false],
            ['name' => 'Optical Shop', 'has_services' => true],
            ['name' => 'Mobile Phone Shop', 'has_services' => false],
            ['name' => 'Mobile Repair Shop', 'has_services' => true],
            ['name' => 'Computer/Laptop Accessories', 'has_services' => true],
            ['name' => 'Electronics Shop', 'has_services' => true],
            ['name' => 'Beauty Products Shop', 'has_services' => false],
            ['name' => 'Salon / Barber Shop', 'has_services' => true],
            ['name' => 'Cosmetic Store', 'has_services' => false],
            ['name' => 'Photocopy & Printing Center', 'has_services' => true],
            ['name' => 'Internet Café', 'has_services' => true],
            ['name' => 'Recharge & Mobile Services', 'has_services' => true],
            ['name' => 'Travel Agent', 'has_services' => true],
            ['name' => 'Paan Shop', 'has_services' => false],
            ['name' => 'Street Food Vendor', 'has_services' => false],
            ['name' => 'Juice & Coconut Stall', 'has_services' => false],
            ['name' => 'Seasonal Item Stall', 'has_services' => false],
            ['name' => 'Toys & Balloons Stall', 'has_services' => false],
            ['name' => 'Pooja Samagri Shop', 'has_services' => false],
            ['name' => 'Flower Vendor', 'has_services' => false],
            ['name' => 'Agarbatti & Diya Shop', 'has_services' => false],
            ['name' => 'Pet Shop', 'has_services' => false],
            ['name' => 'Gift Shop', 'has_services' => false],
            ['name' => 'Fancy Items Shop', 'has_services' => false],
            ['name' => 'Thrift/Second-hand Shop', 'has_services' => false],
            // New shop types for services
            ['name' => 'AC Service Center', 'has_services' => true],
            ['name' => 'Beauty Parlor', 'has_services' => true],
            ['name' => 'Car Service Center', 'has_services' => true],
            ['name' => 'TV Repair Services', 'has_services' => true],
        ];

        foreach ($types as $type) {
            DB::table('shop_types')->insert([
                'id'              => Str::uuid()->toString(),
                'name'            => $type['name'],
                'has_services'    => $type['has_services'],
                'delivery_charge' => $type['has_services'] ? false : true, // Delivery charge for non-service shops
                'platform_charge' => $type['has_services'] ? true : false, // Platform charge for service shops
                'created_at'      => now(),
                'updated_at'      => now(),
            ]);
        }
    }
}
