<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RolesTableSeeder::class,
            PrivilegesTableSeeder::class,
            PrivilegeRoleTableSeeder::class,
            UserSeeder::class,
            AvatarSeeder::class,
            ShopTypeSeeder::class,
            ShopsTableSeeder::class,
            CategorySeeder::class,
            SubcategorySeeder::class,
            ProductSeeder::class,
            ProductInformationSeeder::class,
            SystemServicesSeeder::class,
            AdvisementPageSeeder::class,
            BannerPageSeeder::class,
            ServiceInformationSeeder::class,
            AboutUsSeeder::class,
            ContactUsSeeder::class,
            CareerSeeder::class,
            PrivacyPolicySeeder::class,
            SecurityPageSeeder::class,
            TermSeeder::class,
            DeliveryPageSeeder::class,
            ShopPageSeeder::class,
        ]);
    }
}
