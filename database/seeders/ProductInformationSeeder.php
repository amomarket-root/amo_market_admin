<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductInformation;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductInformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all products
        $products = Product::all();

        $productInformations = [];

        foreach ($products as $product) {
            $baseInfo     = $this->getBaseProductInformation($product);
            $specificInfo = $this->getSpecificProductInformation($product);

            $productInformations[] = array_merge($baseInfo, $specificInfo);
        }

        ProductInformation::insert($productInformations);
    }

    protected function getBaseProductInformation($product)
    {
        return [
            'id'                   => (string) Str::uuid(),
            'product_id'           => $product->id,
            'fssai_license'        => '10012021000071',
            'other_license'        => 'ISO 9001:2008',
            'manufacturer_details' => 'Manufactured by reputable company, following all quality standards.',
            'seller'               => 'MOONSTONE VENTURES LLP',
            'seller_fssai'         => '11222302001128',
            'country_of_origin'    => 'India',
            'state_of_origin'      => 'Gujarat',
            'return_policy'        => 'This item is non-returnable. For a damaged, defective, incorrect or expired item, you can request a replacement within 2 hours of delivery.',
            'disclaimer'           => 'Keep away from direct sunlight. Every effort is made to maintain accuracy of all information.',
            'status'               => 1,
            'created_at'           => now(),
            'updated_at'           => now(),
        ];
    }

    protected function getSpecificProductInformation($product)
    {
        $info = [
            'product_type'               => '',
            'product_flavour'            => '',
            'product_Ingredients'        => '',
            'product_attraction'         => '',
            'key_features'               => '',
            'shelf_life'                 => '',
            'second_unit_weight'         => '',
            'second_unit_price'          => 0,
            'second_unit_original_price' => 0,
            'second_unit_discount'       => null,
            'total_second_unit'          => 0,
            'third_unit_weight'          => '',
            'third_unit_price'           => 0,
            'third_unit_original_price'  => 0,
            'third_unit_discount'        => null,
            'total_third_unit'           => 0,
            'product_image_one'          => $product->image,
            'product_image_two'          => Storage::disk('public')->url('productInformation/default_image_2.png'),
            'product_image_three'        => Storage::disk('public')->url('productInformation/default_image_3.png'),
            'product_image_four'         => Storage::disk('public')->url('productInformation/default_image_4.png'),
            'product_image_five'         => Storage::disk('public')->url('productInformation/default_image_5.png'),
            'product_extra_image'        => $product->image,
            'second_unit_image'          => $product->image,
            'third_unit_image'           => $product->image,
        ];

        // Customize information based on product type
        switch ($product->name) {
            // Cheese products
            case 'Amul Pure Milk Cheese Slices':
                $info['product_type']               = 'Cheese Slices';
                $info['product_flavour']            = 'Mild and creamy';
                $info['product_Ingredients']        = 'Milk, emulsifying salts, iodized salt, preservative';
                $info['product_attraction']         = '100% Vegetarian';
                $info['key_features']               = 'Contains 10 slices. Rich in calcium. Perfect for sandwiches and burgers.';
                $info['shelf_life']                 = '6 months';
                $info['second_unit_weight']         = '500g';
                $info['second_unit_price']          = 295.00;
                $info['second_unit_original_price'] = 312.50;
                $info['second_unit_discount']       = '5.6%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '1kg';
                $info['third_unit_price']           = 580.00;
                $info['third_unit_original_price']  = 625.00;
                $info['third_unit_discount']        = '7.2%';
                $info['total_third_unit']           = 10;
                break;

                // Bread products
            case 'Britannia Milk Bread':
                $info['product_type']               = 'Bread';
                $info['product_flavour']            = 'Mild sweet';
                $info['product_Ingredients']        = 'Wheat flour, milk, sugar, yeast, salt';
                $info['product_attraction']         = 'No preservatives';
                $info['key_features']               = 'Soft and fluffy. Made with real milk. Ideal for sandwiches.';
                $info['shelf_life']                 = '5 days';
                $info['second_unit_weight']         = '800g';
                $info['second_unit_price']          = 90.00;
                $info['second_unit_original_price'] = 95.00;
                $info['second_unit_discount']       = '5.3%';
                $info['total_second_unit']          = 5;
                $info['third_unit_weight']          = '1.5kg';
                $info['third_unit_price']           = 160.00;
                $info['third_unit_original_price']  = 170.00;
                $info['third_unit_discount']        = '5.9%';
                $info['total_third_unit']           = 5;
                break;

                // Butter products
            case 'Amul Salted Butter':
                $info['product_type']               = 'Butter';
                $info['product_flavour']            = 'Salted';
                $info['product_Ingredients']        = 'Milk fat, salt, permitted natural color';
                $info['product_attraction']         = 'Made from fresh cream';
                $info['key_features']               = 'Rich in Vitamin A. Perfect for cooking and baking.';
                $info['shelf_life']                 = '9 months';
                $info['second_unit_weight']         = '500g';
                $info['second_unit_price']          = 360.00;
                $info['second_unit_original_price'] = 380.00;
                $info['second_unit_discount']       = '5.3%';
                $info['total_second_unit']          = 5;
                $info['third_unit_weight']          = '1kg';
                $info['third_unit_price']           = 700.00;
                $info['third_unit_original_price']  = 750.00;
                $info['third_unit_discount']        = '6.7%';
                $info['total_third_unit']           = 5;
                break;

                // Cream products
            case 'Amul Mithai Mate Condensed Milk':
                $info['product_type']               = 'Condensed Milk';
                $info['product_flavour']            = 'Sweet';
                $info['product_Ingredients']        = 'Milk, sugar';
                $info['product_attraction']         = 'No added preservatives';
                $info['key_features']               = 'Ideal for making sweets. Rich and creamy texture.';
                $info['shelf_life']                 = '12 months';
                $info['second_unit_weight']         = '1kg';
                $info['second_unit_price']          = 570.00;
                $info['second_unit_original_price'] = 600.00;
                $info['second_unit_discount']       = '5%';
                $info['total_second_unit']          = 5;
                $info['third_unit_weight']          = '2kg';
                $info['third_unit_price']           = 1100.00;
                $info['third_unit_original_price']  = 1200.00;
                $info['third_unit_discount']        = '8.3%';
                $info['total_third_unit']           = 5;
                break;

                // Curd products
            case 'Nandini Curd':
                $info['product_type']               = 'Curd';
                $info['product_flavour']            = 'Plain';
                $info['product_Ingredients']        = 'Milk, culture';
                $info['product_attraction']         = 'Probiotic';
                $info['key_features']               = 'Made from pure cow milk. Contains live cultures.';
                $info['shelf_life']                 = '3 days';
                $info['second_unit_weight']         = '1kg';
                $info['second_unit_price']          = 50.00;
                $info['second_unit_original_price'] = 52.00;
                $info['second_unit_discount']       = '3.8%';
                $info['total_second_unit']          = 5;
                // No third unit for perishable item
                $info['third_unit_weight']         = null;
                $info['third_unit_price']          = null;
                $info['third_unit_original_price'] = null;
                $info['third_unit_discount']       = null;
                $info['total_third_unit']          = null;
                break;

            case 'Nandini Mango Lassi':
                $info['product_type']               = 'Lassi';
                $info['product_flavour']            = 'Mango';
                $info['product_Ingredients']        = 'Milk, mango pulp, sugar, culture';
                $info['product_attraction']         = 'Real fruit pulp';
                $info['key_features']               = 'Refreshing summer drink. Rich in probiotics.';
                $info['shelf_life']                 = '5 days';
                $info['second_unit_weight']         = '500ml';
                $info['second_unit_price']          = 85.00;
                $info['second_unit_original_price'] = 90.00;
                $info['second_unit_discount']       = '5.6%';
                $info['total_second_unit']          = 5;
                $info['third_unit_weight']          = '1 liter';
                $info['third_unit_price']           = 160.00;
                $info['third_unit_original_price']  = 170.00;
                $info['third_unit_discount']        = '5.9%';
                $info['total_third_unit']           = 5;
                break;

                // Milk products
            case 'Nandini Toned Fresh Milk':
                $info['product_type']               = 'Milk';
                $info['product_flavour']            = 'Plain';
                $info['product_Ingredients']        = 'Milk';
                $info['product_attraction']         = 'Pasteurized';
                $info['key_features']               = '3% fat. Rich in calcium and protein.';
                $info['shelf_life']                 = '2 days';
                $info['second_unit_weight']         = '2 liters';
                $info['second_unit_price']          = 130.00;
                $info['second_unit_original_price'] = 132.00;
                $info['second_unit_discount']       = '1.5%';
                $info['total_second_unit']          = 5;
                $info['third_unit_weight']          = '5 liters';
                $info['third_unit_price']           = 320.00;
                $info['third_unit_original_price']  = 330.00;
                $info['third_unit_discount']        = '3%';
                $info['total_third_unit']           = 5;
                break;

            case 'Nandini Shubham Fresh Milk':
                $info['product_type']               = 'Milk';
                $info['product_flavour']            = 'Plain';
                $info['product_Ingredients']        = 'Milk';
                $info['product_attraction']         = 'Full cream';
                $info['key_features']               = '6% fat. Ideal for making sweets.';
                $info['shelf_life']                 = '2 days';
                $info['second_unit_weight']         = '2 liters';
                $info['second_unit_price']          = 235.00;
                $info['second_unit_original_price'] = 250.00;
                $info['second_unit_discount']       = '6%';
                $info['total_second_unit']          = 5;
                $info['third_unit_weight']          = '5 liters';
                $info['third_unit_price']           = 580.00;
                $info['third_unit_original_price']  = 625.00;
                $info['third_unit_discount']        = '7.2%';
                $info['total_third_unit']           = 5;
                break;

                // Egg products
            case 'Jaya White Eggs':
                $info['product_type']               = 'Eggs';
                $info['product_flavour']            = 'Plain';
                $info['product_Ingredients']        = 'Egg';
                $info['product_attraction']         = 'Farm fresh';
                $info['key_features']               = 'Rich in protein. Strong shells.';
                $info['shelf_life']                 = '15 days';
                $info['second_unit_weight']         = '12 pieces';
                $info['second_unit_price']          = 95.00;
                $info['second_unit_original_price'] = 100.00;
                $info['second_unit_discount']       = '5%';
                $info['total_second_unit']          = 5;
                $info['third_unit_weight']          = '30 pieces';
                $info['third_unit_price']           = 230.00;
                $info['third_unit_original_price']  = 250.00;
                $info['third_unit_discount']        = '8%';
                $info['total_third_unit']           = 5;
                break;

            case 'Table White Eggs':
                $info['product_type']               = 'Eggs';
                $info['product_flavour']            = 'Plain';
                $info['product_Ingredients']        = 'Egg';
                $info['product_attraction']         = 'Free range';
                $info['key_features']               = 'Darker yolks. Richer flavor.';
                $info['shelf_life']                 = '15 days';
                $info['second_unit_weight']         = '12 pieces';
                $info['second_unit_price']          = 110.00;
                $info['second_unit_original_price'] = 120.00;
                $info['second_unit_discount']       = '8.3%';
                $info['total_second_unit']          = 5;
                $info['third_unit_weight']          = '60 pieces';
                $info['third_unit_price']           = 520.00;
                $info['third_unit_original_price']  = 600.00;
                $info['third_unit_discount']        = '13.3%';
                $info['total_third_unit']           = 5;
                break;

                // Chips & Crisps products
            case 'Lay\'s West Indies Hot n Sweet Chilli Flavor Potato Chips':
                $info['product_type']               = 'Potato Chips';
                $info['product_flavour']            = 'Hot & Sweet Chilli';
                $info['product_Ingredients']        = 'Potatoes, vegetable oil, seasoning';
                $info['product_attraction']         = '100% Vegetarian';
                $info['key_features']               = 'Spicy and sweet flavor. Crunchy texture.';
                $info['shelf_life']                 = '3 months';
                $info['second_unit_weight']         = '100g';
                $info['second_unit_price']          = 35.00;
                $info['second_unit_original_price'] = 40.00;
                $info['second_unit_discount']       = '12.5%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '200g';
                $info['third_unit_price']           = 65.00;
                $info['third_unit_original_price']  = 80.00;
                $info['third_unit_discount']        = '18.8%';
                $info['total_third_unit']           = 10;
                break;

            case 'Lay\'s India\'s Magic Masala Potato Chips':
                $info['product_type']               = 'Potato Chips';
                $info['product_flavour']            = 'Magic Masala';
                $info['product_Ingredients']        = 'Potatoes, vegetable oil, spices, salt';
                $info['product_attraction']         = 'Indian flavors';
                $info['key_features']               = 'Tangy and spicy. Authentic Indian taste.';
                $info['shelf_life']                 = '3 months';
                $info['second_unit_weight']         = '100g';
                $info['second_unit_price']          = 35.00;
                $info['second_unit_original_price'] = 40.00;
                $info['second_unit_discount']       = '12.5%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '200g';
                $info['third_unit_price']           = 65.00;
                $info['third_unit_original_price']  = 80.00;
                $info['third_unit_discount']        = '18.8%';
                $info['total_third_unit']           = 10;
                break;

            case 'Beyond Snack Kerala Salt & Pepper Banana Chips':
                $info['product_type']               = 'Banana Chips';
                $info['product_flavour']            = 'Salt & Pepper';
                $info['product_Ingredients']        = 'Banana, coconut oil, salt, pepper';
                $info['product_attraction']         = 'No preservatives';
                $info['key_features']               = 'Traditional Kerala style. Crunchy texture.';
                $info['shelf_life']                 = '2 months';
                $info['second_unit_weight']         = '200g';
                $info['second_unit_price']          = 140.00;
                $info['second_unit_original_price'] = 150.00;
                $info['second_unit_discount']       = '6.7%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '500g';
                $info['third_unit_price']           = 340.00;
                $info['third_unit_original_price']  = 375.00;
                $info['third_unit_discount']        = '9.3%';
                $info['total_third_unit']           = 10;
                break;

            case 'Chheda\'s Long Masala Banana Chips':
                $info['product_type']               = 'Banana Chips';
                $info['product_flavour']            = 'Masala';
                $info['product_Ingredients']        = 'Banana, vegetable oil, spices';
                $info['product_attraction']         = 'Traditional recipe';
                $info['key_features']               = 'Long cut chips. Spicy flavor.';
                $info['shelf_life']                 = '2 months';
                $info['second_unit_weight']         = '300g';
                $info['second_unit_price']          = 170.00;
                $info['second_unit_original_price'] = 190.00;
                $info['second_unit_discount']       = '10.5%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '500g';
                $info['third_unit_price']           = 280.00;
                $info['third_unit_original_price']  = 320.00;
                $info['third_unit_discount']        = '12.5%';
                $info['total_third_unit']           = 10;
                break;

            case 'Lay\'s American Style Cream & Onion Potato Chips':
                $info['product_type']               = 'Potato Chips';
                $info['product_flavour']            = 'Cream & Onion';
                $info['product_Ingredients']        = 'Potatoes, vegetable oil, seasoning';
                $info['product_attraction']         = 'American style';
                $info['key_features']               = 'Creamy and onion flavor. Light and crispy.';
                $info['shelf_life']                 = '3 months';
                $info['second_unit_weight']         = '100g';
                $info['second_unit_price']          = 35.00;
                $info['second_unit_original_price'] = 40.00;
                $info['second_unit_discount']       = '12.5%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '200g';
                $info['third_unit_price']           = 65.00;
                $info['third_unit_original_price']  = 80.00;
                $info['third_unit_discount']        = '18.8%';
                $info['total_third_unit']           = 10;
                break;

            case 'Lay\'s Chile Limon Flavour Potato Chips':
                $info['product_type']               = 'Potato Chips';
                $info['product_flavour']            = 'Chile Limon';
                $info['product_Ingredients']        = 'Potatoes, vegetable oil, seasoning';
                $info['product_attraction']         = 'Tangy and spicy';
                $info['key_features']               = 'Mexican inspired flavor. Zesty lime taste.';
                $info['shelf_life']                 = '3 months';
                $info['second_unit_weight']         = '100g';
                $info['second_unit_price']          = 35.00;
                $info['second_unit_original_price'] = 40.00;
                $info['second_unit_discount']       = '12.5%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '200g';
                $info['third_unit_price']           = 65.00;
                $info['third_unit_original_price']  = 80.00;
                $info['third_unit_discount']        = '18.8%';
                $info['total_third_unit']           = 10;
                break;

                // Soft Drinks products
            case 'Coca-Cola Diet Coke Diets & Lights':
                $info['product_type']               = 'Soft Drink';
                $info['product_flavour']            = 'Cola';
                $info['product_Ingredients']        = 'Carbonated water, caramel color, phosphoric acid, aspartame';
                $info['product_attraction']         = 'Low calorie';
                $info['key_features']               = 'Less than 1 calorie. Same great taste.';
                $info['shelf_life']                 = '9 months';
                $info['second_unit_weight']         = '1 liter';
                $info['second_unit_price']          = 75.00;
                $info['second_unit_original_price'] = 80.00;
                $info['second_unit_discount']       = '6.3%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '2 liters';
                $info['third_unit_price']           = 140.00;
                $info['third_unit_original_price']  = 150.00;
                $info['third_unit_discount']        = '6.7%';
                $info['total_third_unit']           = 10;
                break;

            case 'Thums Up Cola Soft Drink':
                $info['product_type']               = 'Soft Drink';
                $info['product_flavour']            = 'Cola';
                $info['product_Ingredients']        = 'Carbonated water, sugar, caramel color, phosphoric acid';
                $info['product_attraction']         = 'Strong taste';
                $info['key_features']               = 'Bold flavor. High carbonation.';
                $info['shelf_life']                 = '9 months';
                $info['second_unit_weight']         = '1 liter';
                $info['second_unit_price']          = 85.00;
                $info['second_unit_original_price'] = 90.00;
                $info['second_unit_discount']       = '5.6%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '2 liters';
                $info['third_unit_price']           = 160.00;
                $info['third_unit_original_price']  = 170.00;
                $info['third_unit_discount']        = '5.9%';
                $info['total_third_unit']           = 10;
                break;

            case 'Coca-Cola Soft Drink':
                $info['product_type']               = 'Soft Drink';
                $info['product_flavour']            = 'Cola';
                $info['product_Ingredients']        = 'Carbonated water, sugar, caramel color, phosphoric acid';
                $info['product_attraction']         = 'Original taste';
                $info['key_features']               = 'Classic cola flavor. Refreshing.';
                $info['shelf_life']                 = '9 months';
                $info['second_unit_weight']         = '1 liter';
                $info['second_unit_price']          = 85.00;
                $info['second_unit_original_price'] = 90.00;
                $info['second_unit_discount']       = '5.6%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '2 liters';
                $info['third_unit_price']           = 160.00;
                $info['third_unit_original_price']  = 170.00;
                $info['third_unit_discount']        = '5.9%';
                $info['total_third_unit']           = 10;
                break;

            case '7UP Nimbooz with Lemon Juice':
                $info['product_type']               = 'Soft Drink';
                $info['product_flavour']            = 'Lemon';
                $info['product_Ingredients']        = 'Carbonated water, sugar, lemon juice, citric acid';
                $info['product_attraction']         = 'Real lemon juice';
                $info['key_features']               = 'Tangy flavor. Refreshing.';
                $info['shelf_life']                 = '9 months';
                $info['second_unit_weight']         = '1 liter';
                $info['second_unit_price']          = 45.00;
                $info['second_unit_original_price'] = 50.00;
                $info['second_unit_discount']       = '10%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '2 liters';
                $info['third_unit_price']           = 85.00;
                $info['third_unit_original_price']  = 95.00;
                $info['third_unit_discount']        = '10.5%';
                $info['total_third_unit']           = 10;
                break;

            case 'Coca-Cola Zero Sugar Soft Drink':
                $info['product_type']               = 'Soft Drink';
                $info['product_flavour']            = 'Cola';
                $info['product_Ingredients']        = 'Carbonated water, caramel color, phosphoric acid, aspartame';
                $info['product_attraction']         = 'Zero sugar';
                $info['key_features']               = 'No sugar. Same great taste.';
                $info['shelf_life']                 = '9 months';
                $info['second_unit_weight']         = '1 liter';
                $info['second_unit_price']          = 85.00;
                $info['second_unit_original_price'] = 90.00;
                $info['second_unit_discount']       = '5.6%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '2 liters';
                $info['third_unit_price']           = 160.00;
                $info['third_unit_original_price']  = 170.00;
                $info['third_unit_discount']        = '5.9%';
                $info['total_third_unit']           = 10;
                break;

            case 'Paper Boat Zero Lemon Lime Sparkling Drink':
                $info['product_type']               = 'Sparkling Drink';
                $info['product_flavour']            = 'Lemon Lime';
                $info['product_Ingredients']        = 'Carbonated water, natural flavors, citric acid';
                $info['product_attraction']         = 'Zero sugar';
                $info['key_features']               = 'No sugar. No calories. Refreshing.';
                $info['shelf_life']                 = '6 months';
                $info['second_unit_weight']         = '1 liter';
                $info['second_unit_price']          = 110.00;
                $info['second_unit_original_price'] = 120.00;
                $info['second_unit_discount']       = '8.3%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '2 liters';
                $info['third_unit_price']           = 200.00;
                $info['third_unit_original_price']  = 220.00;
                $info['third_unit_discount']        = '9.1%';
                $info['total_third_unit']           = 10;
                break;

            case 'Pepsi Zero Sugar Soft Drink':
                $info['product_type']               = 'Soft Drink';
                $info['product_flavour']            = 'Cola';
                $info['product_Ingredients']        = 'Carbonated water, caramel color, phosphoric acid, aspartame';
                $info['product_attraction']         = 'Zero sugar';
                $info['key_features']               = 'Bold Pepsi taste without sugar.';
                $info['shelf_life']                 = '9 months';
                $info['second_unit_weight']         = '1 liter';
                $info['second_unit_price']          = 85.00;
                $info['second_unit_original_price'] = 90.00;
                $info['second_unit_discount']       = '5.6%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '2 liters';
                $info['third_unit_price']           = 160.00;
                $info['third_unit_original_price']  = 170.00;
                $info['third_unit_discount']        = '5.9%';
                $info['total_third_unit']           = 10;
                break;

            case 'Mirinda Soft Drink':
                $info['product_type']               = 'Soft Drink';
                $info['product_flavour']            = 'Orange';
                $info['product_Ingredients']        = 'Carbonated water, sugar, orange juice concentrate';
                $info['product_attraction']         = 'Fruity flavor';
                $info['key_features']               = 'Bold orange taste. Refreshing.';
                $info['shelf_life']                 = '9 months';
                $info['second_unit_weight']         = '1 liter';
                $info['second_unit_price']          = 85.00;
                $info['second_unit_original_price'] = 90.00;
                $info['second_unit_discount']       = '5.6%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '2 liters';
                $info['third_unit_price']           = 160.00;
                $info['third_unit_original_price']  = 170.00;
                $info['third_unit_discount']        = '5.9%';
                $info['total_third_unit']           = 10;
                break;

                // Default case for any product not specifically listed
            default:
                $info['product_type']               = 'General';
                $info['product_flavour']            = 'Standard';
                $info['product_Ingredients']        = 'Various ingredients';
                $info['product_attraction']         = 'Quality product';
                $info['key_features']               = 'Good quality. Value for money.';
                $info['shelf_life']                 = '6 months';
                $info['second_unit_weight']         = '500g';
                $info['second_unit_price']          = round($product->price * 2.5, 2);
                $info['second_unit_original_price'] = round($product->price * 2.8, 2);
                $info['second_unit_discount']       = '10%';
                $info['total_second_unit']          = 10;
                $info['third_unit_weight']          = '1kg';
                $info['third_unit_price']           = round($product->price * 4.8, 2);
                $info['third_unit_original_price']  = round($product->price * 5.5, 2);
                $info['third_unit_discount']        = '12.7%';
                $info['total_third_unit']           = 10;
                break;
        }

        return $info;
    }
}
