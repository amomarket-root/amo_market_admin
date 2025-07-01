<?php

namespace Database\Seeders;

use App\Models\ServiceInformation;
use App\Models\SubCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceInformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // TV Repair Services
        $tvRepairSubCategory = SubCategory::where('name', 'TV Repair & Services')->first();
        if ($tvRepairSubCategory) {
            ServiceInformation::create([
                'id'              => (string) Str::uuid(),
                'sub_category_id' => $tvRepairSubCategory->id,
                'service_type'    => 'TVRepair',
                'base_price'      => 500,
                'service_options' => json_encode([
                    'diagnostic' => [
                        'price'   => 500,
                        'details' => [
                            'Complete TV inspection',
                            'Problem identification',
                            'Detailed diagnosis report',
                            'No repair work included',
                            'Estimated time: 1-2 hours',
                        ],
                    ],
                    'minor' => [
                        'price'   => 1500,
                        'details' => [
                            'All diagnostic services',
                            'Basic repairs (cable, port issues)',
                            'Software troubleshooting',
                            'Remote control repair',
                            'Estimated time: 2-3 hours',
                        ],
                    ],
                    'major' => [
                        'price'   => 3000,
                        'details' => [
                            'All minor repair services',
                            'Circuit board repairs',
                            'Power supply issues',
                            'Backlight repairs',
                            'Estimated time: 3-5 hours',
                        ],
                    ],
                    'panel' => [
                        'price'   => 8000,
                        'details' => [
                            'TV screen replacement',
                            'Panel repair service',
                            'Includes parts and labor',
                            'Warranty on replacement',
                            'Estimated time: 4-6 hours',
                        ],
                    ],
                    'software' => [
                        'price'   => 1000,
                        'details' => [
                            'Firmware updates',
                            'Smart TV software issues',
                            'App installation/removal',
                            'Factory reset',
                            'Estimated time: 1-2 hours',
                        ],
                    ],
                ]),
                'size_options' => json_encode([
                    'small' => [
                        'price' => 0,
                        'label' => 'Small (up to 32")',
                    ],
                    'medium' => [
                        'price' => 500,
                        'label' => 'Medium (33"-55")',
                    ],
                    'large' => [
                        'price' => 1000,
                        'label' => 'Large (56"-75")',
                    ],
                    'xlarge' => [
                        'price' => 2000,
                        'label' => 'Extra Large (76"+)',
                    ],
                ]),
                'location_options' => json_encode([
                    'center' => [
                        'price' => 0,
                        'label' => 'Bring to our shop',
                    ],
                    'home' => [
                        'price' => 800,
                        'label' => 'Home service',
                    ],
                ]),
                'time_slots' => json_encode([
                    ['value' => 'anytime', 'label' => 'Anytime', 'duration' => 'Varies'],
                    ['value' => 'morning', 'label' => 'Morning (9AM-12PM)', 'duration' => '2-4 hours'],
                    ['value' => 'afternoon', 'label' => 'Afternoon (12PM-4PM)', 'duration' => '2-4 hours'],
                    ['value' => 'evening', 'label' => 'Evening (4PM-8PM)', 'duration' => '2-4 hours'],
                    ['value' => 'express', 'label' => 'Express Service', 'duration' => '1-2 hours', 'extra' => 500],
                ]),
                'estimated_duration' => 120,
                'is_active'          => true,
            ]);
        }

        // Mobile Repair Services
        $mobileRepairSubCategory = SubCategory::where('name', 'Mobile Repair & Services')->first();
        if ($mobileRepairSubCategory) {
            ServiceInformation::create([
                'id'              => (string) Str::uuid(),
                'sub_category_id' => $mobileRepairSubCategory->id,
                'service_type'    => 'MobileRepair',
                'base_price'      => 300,
                'service_options' => json_encode([
                    'diagnostic' => [
                        'price'   => 300,
                        'details' => [
                            'Complete device inspection',
                            'Problem identification',
                            'Detailed diagnosis report',
                            'No repair work included',
                            'Estimated time: 30-60 mins',
                        ],
                    ],
                    'screen' => [
                        'price'   => 1500,
                        'details' => [
                            'Screen replacement',
                            'LCD/Digitizer repair',
                            'Glass replacement',
                            'Quality replacement parts',
                            'Estimated time: 1-2 hours',
                        ],
                    ],
                    'battery' => [
                        'price'   => 1200,
                        'details' => [
                            'Battery replacement',
                            'Battery health check',
                            'Performance optimization',
                            'Genuine/OEM batteries',
                            'Estimated time: 45-90 mins',
                        ],
                    ],
                    'software' => [
                        'price'   => 500,
                        'details' => [
                            'OS reinstallation',
                            'Software troubleshooting',
                            'Virus/malware removal',
                            'Data backup available',
                            'Estimated time: 1-2 hours',
                        ],
                    ],
                    'charging' => [
                        'price'   => 800,
                        'details' => [
                            'Charging port repair',
                            'Battery connector check',
                            'Circuit board inspection',
                            'Water damage assessment',
                            'Estimated time: 1-2 hours',
                        ],
                    ],
                    'water' => [
                        'price'   => 2000,
                        'details' => [
                            'Liquid damage repair',
                            'Corrosion cleaning',
                            'Component replacement',
                            'Data recovery attempt',
                            'Estimated time: 2-4 hours',
                        ],
                    ],
                    'camera' => [
                        'price'   => 1000,
                        'details' => [
                            'Camera module replacement',
                            'Lens cleaning',
                            'Software calibration',
                            'Focus issues repair',
                            'Estimated time: 1-2 hours',
                        ],
                    ],
                ]),
                'type_options' => json_encode([
                    'smartphone' => [
                        'price' => 0,
                        'label' => 'Smartphone',
                    ],
                    'tablet' => [
                        'price' => 500,
                        'label' => 'Tablet',
                    ],
                    'foldable' => [
                        'price' => 1000,
                        'label' => 'Foldable Phone',
                    ],
                ]),
                'location_options' => json_encode([
                    'center' => [
                        'price' => 0,
                        'label' => 'Service Center',
                    ],
                    'home' => [
                        'price' => 600,
                        'label' => 'Home Service',
                    ],
                ]),
                'time_slots' => json_encode([
                    ['value' => 'anytime', 'label' => 'Anytime', 'duration' => 'Varies'],
                    ['value' => 'morning', 'label' => 'Morning (9AM-12PM)', 'duration' => '1-3 hours'],
                    ['value' => 'afternoon', 'label' => 'Afternoon (12PM-4PM)', 'duration' => '1-3 hours'],
                    ['value' => 'evening', 'label' => 'Evening (4PM-8PM)', 'duration' => '1-3 hours'],
                    ['value' => 'express', 'label' => 'Express Service', 'duration' => '30-60 mins', 'extra' => 400],
                ]),
                'estimated_duration' => 60,
                'is_active'          => true,
            ]);
        }

        // Men's Salon Services
        $mensSalonSubCategory = SubCategory::where('name', 'Men\'s Salon & Services')->first();
        if ($mensSalonSubCategory) {
            ServiceInformation::create([
                'id'              => (string) Str::uuid(),
                'sub_category_id' => $mensSalonSubCategory->id,
                'service_type'    => 'MensSalon',
                'base_price'      => 500,
                'service_options' => json_encode([
                    'haircut' => [
                        'price'   => 500,
                        'details' => [
                            'Professional haircut',
                            'Hair wash included',
                            'Styling as per preference',
                            'Neck shave (optional)',
                            'Estimated time: 30-45 mins',
                        ],
                    ],
                    'beard' => [
                        'price'   => 300,
                        'details' => [
                            'Beard trimming & shaping',
                            'Beard wash',
                            'Hot towel treatment',
                            'Beard oil application',
                            'Estimated time: 20-30 mins',
                        ],
                    ],
                    'haircut_beard' => [
                        'price'   => 700,
                        'details' => [
                            'Complete haircut service',
                            'Full beard grooming',
                            'Hot towel treatment',
                            'Hair & beard styling',
                            'Estimated time: 45-60 mins',
                        ],
                    ],
                    'facial' => [
                        'price'   => 800,
                        'details' => [
                            'Deep cleansing',
                            'Exfoliation',
                            'Steam treatment',
                            'Face mask',
                            'Moisturizing',
                            'Estimated time: 45 mins',
                        ],
                    ],
                    'hair_color' => [
                        'price'   => 1200,
                        'details' => [
                            'Professional hair coloring',
                            'Consultation on shade',
                            'Ammonia-free options',
                            'Conditioning treatment',
                            'Estimated time: 60-90 mins',
                        ],
                    ],
                    'head_massage' => [
                        'price'   => 600,
                        'details' => [
                            'Relaxing head massage',
                            'Aromatherapy oils',
                            'Neck & shoulder massage',
                            'Stress relief techniques',
                            'Estimated time: 30 mins',
                        ],
                    ],
                    'shave' => [
                        'price'   => 250,
                        'details' => [
                            'Traditional hot towel shave',
                            'Pre-shave oil',
                            'Post-shave balm',
                            'Face massage',
                            'Estimated time: 20 mins',
                        ],
                    ],
                    'keratin' => [
                        'price'   => 2000,
                        'details' => [
                            'Keratin smoothing treatment',
                            'Frizz control',
                            'Professional application',
                            'Lasts 2-3 months',
                            'Estimated time: 90-120 mins',
                        ],
                    ],
                    'spa' => [
                        'price'   => 1500,
                        'details' => [
                            'Full hair spa treatment',
                            'Deep conditioning',
                            'Scalp massage',
                            'Hair mask',
                            'Estimated time: 60 mins',
                        ],
                    ],
                    'waxing' => [
                        'price'   => 400,
                        'details' => [
                            'Chest waxing',
                            'Back waxing',
                            'Arm waxing',
                            'After-wax lotion',
                            'Estimated time: 30-45 mins',
                        ],
                    ],
                ]),
                'type_options' => json_encode([
                    'short' => [
                        'price' => 0,
                        'label' => 'Short',
                    ],
                    'medium' => [
                        'price' => 100,
                        'label' => 'Medium',
                    ],
                    'long' => [
                        'price' => 200,
                        'label' => 'Long',
                    ],
                ]),
                'location_options' => json_encode([
                    'salon' => [
                        'price' => 0,
                        'label' => 'Salon Visit',
                    ],
                    'home' => [
                        'price' => 600,
                        'label' => 'Home Service',
                    ],
                ]),
                'time_slots' => json_encode([
                    ['value' => 'anytime', 'label' => 'Anytime', 'duration' => 'Varies'],
                    ['value' => 'morning', 'label' => 'Morning (9AM-12PM)', 'duration' => '30-60 mins'],
                    ['value' => 'afternoon', 'label' => 'Afternoon (12PM-4PM)', 'duration' => '30-60 mins'],
                    ['value' => 'evening', 'label' => 'Evening (4PM-8PM)', 'duration' => '30-60 mins'],
                    ['value' => 'express', 'label' => 'Express Service', 'duration' => '15-30 mins', 'extra' => 300],
                ]),
                'estimated_duration' => 45,
                'is_active'          => true,
            ]);
        }

        // Home Appliance Services
        $homeApplianceSubCategory = SubCategory::where('name', 'Home Appliance Repair & Services')->first();
        if ($homeApplianceSubCategory) {
            ServiceInformation::create([
                'id'              => (string) Str::uuid(),
                'sub_category_id' => $homeApplianceSubCategory->id,
                'service_type'    => 'HomeAppliance',
                'base_price'      => 800,
                'service_options' => json_encode([
                    'repair' => [
                        'price'   => 1200,
                        'label'   => 'Repair Service',
                        'details' => [
                            'General appliance repair',
                            'Component replacement',
                            'Electrical checks',
                            'Performance testing',
                            'Estimated time: 2-4 hours',
                        ],
                    ],
                    'installation' => [
                        'price'   => 800,
                        'label'   => 'Installation',
                        'details' => [
                            'New appliance installation',
                            'Proper setup and alignment',
                            'Safety checks',
                            'Basic demonstration',
                            'Estimated time: 1-3 hours',
                        ],
                    ],
                    'uninstallation' => [
                        'price'   => 600,
                        'label'   => 'Uninstallation',
                        'details' => [
                            'Appliance removal',
                            'Safe disconnection',
                            'Transport preparation',
                            'Area cleanup',
                            'Estimated time: 1-2 hours',
                        ],
                    ],
                    'maintenance' => [
                        'price'   => 900,
                        'label'   => 'Maintenance',
                        'details' => [
                            'Preventive maintenance',
                            'Cleaning and lubrication',
                            'Performance optimization',
                            'Wear and tear inspection',
                            'Estimated time: 2-3 hours',
                        ],
                    ],
                    'deepclean' => [
                        'price'   => 1500,
                        'label'   => 'Deep Cleaning',
                        'details' => [
                            'Deep cleaning service',
                            'Sanitization',
                            'Odor removal',
                            'Interior/exterior cleaning',
                            'Estimated time: 2-4 hours',
                        ],
                    ],
                    'gasrefill' => [
                        'price'   => 1800,
                        'label'   => 'Gas Refill',
                        'details' => [
                            'Gas refilling service',
                            'Leak detection',
                            'Pressure testing',
                            'Cooling optimization',
                            'Estimated time: 2-3 hours',
                        ],
                    ],
                    'motorreplace' => [
                        'price'   => 2000,
                        'label'   => 'Motor Replacement',
                        'details' => [
                            'Motor replacement',
                            'New motor installation',
                            'Performance testing',
                            'Warranty on parts',
                            'Estimated time: 3-5 hours',
                        ],
                    ],
                ]),
                'type_options' => json_encode([
                    'refrigerator' => [
                        'price' => 0,
                        'label' => 'Refrigerator',
                    ],
                    'washingmachine' => [
                        'price' => 300,
                        'label' => 'Washing Machine',
                    ],
                    'microwave' => [
                        'price' => 200,
                        'label' => 'Microwave',
                    ],
                    'dishwasher' => [
                        'price' => 400,
                        'label' => 'Dishwasher',
                    ],
                    'oven' => [
                        'price' => 500,
                        'label' => 'Oven',
                    ],
                    'chimney' => [
                        'price' => 600,
                        'label' => 'Chimney',
                    ],
                    'mixer' => [
                        'price' => 100,
                        'label' => 'Mixer/Grinder',
                    ],
                ]),
                'size_options' => json_encode([
                    'small' => [
                        'price' => 0,
                        'label' => 'Small (Compact)',
                    ],
                    'medium' => [
                        'price' => 300,
                        'label' => 'Medium (Standard)',
                    ],
                    'large' => [
                        'price' => 600,
                        'label' => 'Large',
                    ],
                    'xlarge' => [
                        'price' => 900,
                        'label' => 'Extra Large',
                    ],
                ]),
                'location_options' => json_encode([
                    'home' => [
                        'price' => 500,
                        'label' => 'Home Service',
                    ],
                    'center' => [
                        'price' => 0,
                        'label' => 'Bring to Service Center',
                    ],
                ]),
                'time_slots' => json_encode([
                    ['value' => 'anytime', 'label' => 'Anytime', 'duration' => 'Varies'],
                    ['value' => 'morning', 'label' => 'Morning (8AM-12PM)', 'duration' => '2-4 hours'],
                    ['value' => 'afternoon', 'label' => 'Afternoon (12PM-4PM)', 'duration' => '2-4 hours'],
                    ['value' => 'evening', 'label' => 'Evening (4PM-8PM)', 'duration' => '2-4 hours'],
                    ['value' => 'express', 'label' => 'Express Service', 'duration' => '1-2 hours', 'extra' => 400],
                ]),
                'estimated_duration' => 120,
                'is_active'          => true,
            ]);
        }

        // Car Services
        $carServiceSubCategory = SubCategory::where('name', 'Car Service & Detailing')->first();
        if ($carServiceSubCategory) {
            ServiceInformation::create([
                'id'              => (string) Str::uuid(),
                'sub_category_id' => $carServiceSubCategory->id,
                'service_type'    => 'CarService',
                'base_price'      => 1000,
                'service_options' => json_encode([
                    'wash' => [
                        'price'   => 1000,
                        'details' => [
                            'Exterior wash',
                            'Interior vacuuming',
                            'Window cleaning',
                            'Tire dressing',
                            'Dashboard polishing',
                            'Estimated time: 1-2 hours',
                        ],
                    ],
                    'basic' => [
                        'price'   => 1500,
                        'details' => [
                            'Engine oil change',
                            'Oil filter replacement',
                            'Air filter cleaning',
                            'Brake inspection',
                            'Tire rotation and balancing',
                            'Estimated time: 2-3 hours',
                        ],
                    ],
                    'standard' => [
                        'price'   => 3000,
                        'details' => [
                            'All basic services',
                            'Coolant replacement',
                            'Spark plug replacement',
                            'Battery check',
                            'Wheel alignment',
                            'Estimated time: 3-4 hours',
                        ],
                    ],
                    'premium' => [
                        'price'   => 4000,
                        'details' => [
                            'All standard services',
                            'Full diagnostic check',
                            'AC service',
                            'Fuel system cleaning',
                            'Transmission fluid change',
                            'Estimated time: 4-6 hours',
                        ],
                    ],
                ]),
                'type_options' => json_encode([
                    'hatchback' => [
                        'price' => 0,
                        'label' => 'Hatchback',
                    ],
                    'sedan' => [
                        'price' => 500,
                        'label' => 'Sedan',
                    ],
                    'suv' => [
                        'price' => 800,
                        'label' => 'SUV',
                    ],
                    'luxury' => [
                        'price' => 1200,
                        'label' => 'Luxury Car',
                    ],
                ]),
                'location_options' => json_encode([
                    'center' => [
                        'price' => 0,
                        'label' => 'Service Center',
                    ],
                    'home' => [
                        'price' => 500,
                        'label' => 'Home Service',
                    ],
                ]),
                'time_slots' => json_encode([
                    ['value' => 'anytime', 'label' => 'Anytime', 'duration' => 'Varies'],
                    ['value' => 'morning', 'label' => 'Morning (8AM-12PM)', 'duration' => '2-3 hours'],
                    ['value' => 'afternoon', 'label' => 'Afternoon (12PM-4PM)', 'duration' => '2-3 hours'],
                    ['value' => 'evening', 'label' => 'Evening (4PM-8PM)', 'duration' => '2-3 hours'],
                    ['value' => 'express', 'label' => 'Express Service', 'duration' => '1-2 hours', 'extra' => 300],
                ]),
                'estimated_duration' => 120,
                'is_active'          => true,
            ]);
        }

        // Beauty Parlor Services
        $beautyParlorSubCategory = SubCategory::where('name', 'Beauty Salon & Services')->first();
        if ($beautyParlorSubCategory) {
            ServiceInformation::create([
                'id'              => (string) Str::uuid(),
                'sub_category_id' => $beautyParlorSubCategory->id,
                'service_type'    => 'BeautyParlor',
                'base_price'      => 500,
                'service_options' => json_encode([
                    'facial' => [
                        'price'    => 1500,
                        'category' => 'face',
                        'details'  => [
                            'Deep cleansing',
                            'Exfoliation',
                            'Steam',
                            'Face mask',
                            'Moisturizing',
                            'Estimated time: 60-90 mins',
                        ],
                    ],
                    'haircut' => [
                        'price'    => 800,
                        'category' => 'hair',
                        'details'  => [
                            'Hair wash',
                            'Haircut as per style',
                            'Blow dry',
                            'Basic styling',
                            'Estimated time: 45-60 mins',
                        ],
                    ],
                    'waxing' => [
                        'price'    => 1200,
                        'category' => 'body',
                        'details'  => [
                            'Full legs waxing',
                            'Full arms waxing',
                            'Underarms waxing',
                            'Bikini waxing',
                            'Estimated time: 30-60 mins',
                        ],
                    ],
                    'threading' => [
                        'price'    => 500,
                        'category' => 'face',
                        'details'  => [
                            'Eyebrows threading',
                            'Upper lip threading',
                            'Forehead threading',
                            'Side locks threading',
                            'Estimated time: 15-30 mins',
                        ],
                    ],
                    'manicure' => [
                        'price'    => 700,
                        'category' => 'hands',
                        'details'  => [
                            'Hand soak',
                            'Cuticle care',
                            'Nail shaping',
                            'Hand massage',
                            'Nail polish',
                            'Estimated time: 45 mins',
                        ],
                    ],
                    'pedicure' => [
                        'price'    => 800,
                        'category' => 'feet',
                        'details'  => [
                            'Foot soak',
                            'Callus removal',
                            'Nail shaping',
                            'Foot massage',
                            'Nail polish',
                            'Estimated time: 60 mins',
                        ],
                    ],
                    'makeup' => [
                        'price'    => 2500,
                        'category' => 'face',
                        'details'  => [
                            'Foundation',
                            'Eye makeup',
                            'Contouring',
                            'Lipstick',
                            'Finishing spray',
                            'Estimated time: 60-90 mins',
                        ],
                    ],
                    'hairspa' => [
                        'price'    => 1800,
                        'category' => 'hair',
                        'details'  => [
                            'Hair massage',
                            'Deep conditioning',
                            'Steam treatment',
                            'Hair wash',
                            'Blow dry',
                            'Estimated time: 90 mins',
                        ],
                    ],
                    'bleach' => [
                        'price'    => 600,
                        'category' => 'face',
                        'details'  => [
                            'Face bleach',
                            'Neck bleach',
                            'Arms bleach',
                            'Full body bleach available',
                            'Estimated time: 30-45 mins',
                        ],
                    ],
                    'massage' => [
                        'price'    => 2000,
                        'category' => 'body',
                        'details'  => [
                            'Head massage',
                            'Neck & shoulder massage',
                            'Aromatherapy oils',
                            'Relaxation techniques',
                            'Estimated time: 60 mins',
                        ],
                    ],
                ]),
                'additional_options' => json_encode([
                    'face' => [
                        'label' => 'Face Care',
                    ],
                    'hair' => [
                        'label' => 'Hair Care',
                    ],
                    'body' => [
                        'label' => 'Body Care',
                    ],
                    'hands' => [
                        'label' => 'Hand Care',
                    ],
                    'feet' => [
                        'label' => 'Foot Care',
                    ],
                ]),
                'location_options' => json_encode([
                    'parlour' => [
                        'price' => 0,
                        'label' => 'Parlour Visit',
                    ],
                    'home' => [
                        'price' => 500,
                        'label' => 'Home Service',
                    ],
                ]),
                'time_slots' => json_encode([
                    ['value' => 'anytime', 'label' => 'Anytime', 'duration' => 'Varies'],
                    ['value' => 'morning', 'label' => 'Morning (9AM-12PM)', 'duration' => '1-2 hours'],
                    ['value' => 'afternoon', 'label' => 'Afternoon (12PM-4PM)', 'duration' => '1-2 hours'],
                    ['value' => 'evening', 'label' => 'Evening (4PM-8PM)', 'duration' => '1-2 hours'],
                    ['value' => 'express', 'label' => 'Express Service', 'duration' => '30-45 mins', 'extra' => 500],
                ]),
                'estimated_duration' => 60,
                'is_active'          => true,
            ]);
        }

        // AC Services
        $acServiceSubCategory = SubCategory::where('name', 'AC Install & Services')->first();
        if ($acServiceSubCategory) {
            ServiceInformation::create([
                'id'              => (string) Str::uuid(),
                'sub_category_id' => $acServiceSubCategory->id,
                'service_type'    => 'ACService',
                'base_price'      => 800,
                'service_options' => json_encode([
                    'installation' => [
                        'price'   => 1500,
                        'details' => [
                            'Professional AC installation',
                            'Mounting and setup',
                            'Electrical connections',
                            'Basic testing',
                            'Estimated time: 2-3 hours',
                        ],
                    ],
                    'repair' => [
                        'price'   => 1200,
                        'details' => [
                            'AC repair service',
                            'Gas refill available',
                            'Electrical checks',
                            'Performance testing',
                            'Estimated time: 2-4 hours',
                        ],
                    ],
                    'maintenance' => [
                        'price'   => 900,
                        'details' => [
                            'Preventive maintenance',
                            'Cleaning and servicing',
                            'Performance optimization',
                            'Wear and tear inspection',
                            'Estimated time: 2-3 hours',
                        ],
                    ],
                    'deepclean' => [
                        'price'   => 1500,
                        'details' => [
                            'Deep cleaning service',
                            'Sanitization',
                            'Odor removal',
                            'Interior/exterior cleaning',
                            'Estimated time: 2-4 hours',
                        ],
                    ],
                    'gasrefill' => [
                        'price'   => 1800,
                        'details' => [
                            'Gas refilling service',
                            'Leak detection',
                            'Pressure testing',
                            'Cooling optimization',
                            'Estimated time: 2-3 hours',
                        ],
                    ],
                ]),
                'type_options' => json_encode([
                    'window' => [
                        'price' => 0,
                        'label' => 'Window AC',
                    ],
                    'split' => [
                        'price' => 500,
                        'label' => 'Split AC',
                    ],
                    'central' => [
                        'price' => 1000,
                        'label' => 'Central AC',
                    ],
                ]),
                'size_options' => json_encode([
                    'small' => [
                        'price' => 0,
                        'label' => 'Small (1 Ton)',
                    ],
                    'medium' => [
                        'price' => 300,
                        'label' => 'Medium (1.5 Ton)',
                    ],
                    'large' => [
                        'price' => 600,
                        'label' => 'Large (2 Ton)',
                    ],
                ]),
                'location_options' => json_encode([
                    'home' => [
                        'price' => 500,
                        'label' => 'Home Service',
                    ],
                    'center' => [
                        'price' => 0,
                        'label' => 'Bring to Service Center',
                    ],
                ]),
                'time_slots' => json_encode([
                    ['value' => 'anytime', 'label' => 'Anytime', 'duration' => 'Varies'],
                    ['value' => 'morning', 'label' => 'Morning (8AM-12PM)', 'duration' => '2-4 hours'],
                    ['value' => 'afternoon', 'label' => 'Afternoon (12PM-4PM)', 'duration' => '2-4 hours'],
                    ['value' => 'evening', 'label' => 'Evening (4PM-8PM)', 'duration' => '2-4 hours'],
                    ['value' => 'express', 'label' => 'Express Service', 'duration' => '1-2 hours', 'extra' => 400],
                ]),
                'estimated_duration' => 120,
                'is_active'          => true,
            ]);
        }
    }
}
