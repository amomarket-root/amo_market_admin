<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SubCategorySeederBackup extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        // Get categories by name
        $dairyCategory        = Category::where('name', 'Dairy, Bread & Eggs')->first();
        $hairCategory         = Category::where('name', 'Hair Services')->first();
        $skinCategory         = Category::where('name', 'Skin Care')->first();
        $screenRepairCategory = Category::where('name', 'Screen Replacement')->first();
        $tvRepairCategory     = Category::where('name', 'TV Repair')->first();
        $printingCategory     = Category::where('name', 'Printing Services')->first();

        $subcategories = [];

        // Grocery subcategories
        if ($dairyCategory) {
            $grocerySubcategories = [
                [
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Milk',
                    'image'        => Storage::disk('public')->url('subcategories/Milk.png'),
                    'description'  => 'Fresh milk and dairy products',
                    'product_code' => 'DAIRY-001',
                    'status'       => 1,
                ],
                [
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Cheese',
                    'image'        => Storage::disk('public')->url('subcategories/Cheese.png'),
                    'description'  => 'Various types of cheese',
                    'product_code' => 'DAIRY-002',
                    'status'       => 1,
                ],
                [
                    'category_id'  => $dairyCategory->id,
                    'name'         => 'Yogurt',
                    'image'        => Storage::disk('public')->url('subcategories/Yogurt.png'),
                    'description'  => 'Plain and flavored yogurt',
                    'product_code' => 'DAIRY-003',
                    'status'       => 1,
                ],
            ];
            $subcategories = array_merge($subcategories, $grocerySubcategories);
        }

        // Salon service subcategories
        if ($hairCategory) {
            $salonSubcategories = [
                [
                    'category_id'  => $hairCategory->id,
                    'name'         => 'Haircut',
                    'image'        => Storage::disk('public')->url('service_subcategories/haircut.png'),
                    'description'  => 'Professional haircut services',
                    'product_code' => 'SALON-101',
                    'status'       => 1,
                ],
                [
                    'category_id'  => $hairCategory->id,
                    'name'         => 'Hair Coloring',
                    'image'        => Storage::disk('public')->url('service_subcategories/hair_color.png'),
                    'description'  => 'Professional hair coloring services',
                    'product_code' => 'SALON-102',
                    'status'       => 1,
                ],
                [
                    'category_id'  => $hairCategory->id,
                    'name'         => 'Hair Treatment',
                    'image'        => Storage::disk('public')->url('service_subcategories/hair_treatment.png'),
                    'description'  => 'Specialized hair treatments',
                    'product_code' => 'SALON-103',
                    'status'       => 1,
                ],
            ];
            $subcategories = array_merge($subcategories, $salonSubcategories);
        }

        if ($skinCategory) {
            $skinSubcategories = [
                [
                    'category_id'  => $skinCategory->id,
                    'name'         => 'Facial',
                    'image'        => Storage::disk('public')->url('service_subcategories/facial.png'),
                    'description'  => 'Professional facial treatments',
                    'product_code' => 'SALON-201',
                    'status'       => 1,
                ],
                [
                    'category_id'  => $skinCategory->id,
                    'name'         => 'Waxing',
                    'image'        => Storage::disk('public')->url('service_subcategories/waxing.png'),
                    'description'  => 'Body waxing services',
                    'product_code' => 'SALON-202',
                    'status'       => 1,
                ],
            ];
            $subcategories = array_merge($subcategories, $skinSubcategories);
        }

        // Mobile repair subcategories
        if ($screenRepairCategory) {
            $repairSubcategories = [
                [
                    'category_id'  => $screenRepairCategory->id,
                    'name'         => 'iPhone Screen',
                    'image'        => Storage::disk('public')->url('service_subcategories/iphone_screen.png'),
                    'description'  => 'iPhone screen replacement services',
                    'product_code' => 'REP-301',
                    'status'       => 1,
                ],
                [
                    'category_id'  => $screenRepairCategory->id,
                    'name'         => 'Android Screen',
                    'image'        => Storage::disk('public')->url('service_subcategories/android_screen.png'),
                    'description'  => 'Android phone screen replacement',
                    'product_code' => 'REP-302',
                    'status'       => 1,
                ],
            ];
            $subcategories = array_merge($subcategories, $repairSubcategories);
        }

        // Electronics repair subcategories
        if ($tvRepairCategory) {
            $electronicsSubcategories = [
                [
                    'category_id'  => $tvRepairCategory->id,
                    'name'         => 'LED TV Repair',
                    'image'        => Storage::disk('public')->url('service_subcategories/led_tv.png'),
                    'description'  => 'LED television repair services',
                    'product_code' => 'ELEC-401',
                    'status'       => 1,
                ],
                [
                    'category_id'  => $tvRepairCategory->id,
                    'name'         => 'Smart TV Repair',
                    'image'        => Storage::disk('public')->url('service_subcategories/smart_tv.png'),
                    'description'  => 'Smart television system repairs',
                    'product_code' => 'ELEC-402',
                    'status'       => 1,
                ],
            ];
            $subcategories = array_merge($subcategories, $electronicsSubcategories);
        }

        // Internet cafe subcategories
        if ($printingCategory) {
            $internetSubcategories = [
                [
                    'category_id'  => $printingCategory->id,
                    'name'         => 'Color Printing',
                    'image'        => Storage::disk('public')->url('service_subcategories/color_print.png'),
                    'description'  => 'High-quality color printing services',
                    'product_code' => 'IT-501',
                    'status'       => 1,
                ],
                [
                    'category_id'  => $printingCategory->id,
                    'name'         => 'Document Scanning',
                    'image'        => Storage::disk('public')->url('service_subcategories/scanning.png'),
                    'description'  => 'Document scanning and digitization',
                    'product_code' => 'IT-502',
                    'status'       => 1,
                ],
            ];
            $subcategories = array_merge($subcategories, $internetSubcategories);
        }

        // Add timestamps and UUIDs
        foreach ($subcategories as &$subcategory) {
            $subcategory['id']         = (string) Str::uuid();
            $subcategory['created_at'] = now();
            $subcategory['updated_at'] = now();
        }

        SubCategory::insert($subcategories);
    }
}
