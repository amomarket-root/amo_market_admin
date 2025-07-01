<?php

namespace Database\Seeders;

use App\Models\Term;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TermSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = 'terms/terms.webp';
        Term::create([
            'id'         => (string) Str::uuid(),
            'title'      => 'Terms and Conditions',
            'content'    => "Welcome to Amo Market, These Terms and Conditions outline the rules and regulations for the use of our services. By accessing or using our services, you agree to comply with these terms.\n\nWe reserve the right to modify these terms at any time. It is your responsibility to review these terms periodically for any changes. Your continued use of our services after any modifications constitutes acceptance of the new terms.\n\nYou agree to provide accurate and complete information when using our services. Any false or misleading information may result in the suspension or termination of your account.\n\nAmo Market is not liable for any damages or losses resulting from your use of our services. We strive to provide a seamless experience, but we cannot guarantee uninterrupted access or error-free services.\n\nIf you have any questions or concerns regarding these Terms and Conditions, please feel free to contact us.",
            'image_path' => Storage::disk('public')->url($path),
            'is_active'  => true,
        ]);
    }
}
