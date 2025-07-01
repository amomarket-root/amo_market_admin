<?php

namespace Database\Seeders;

use App\Models\PrivacyPolicy;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PrivacyPolicySeeder extends Seeder
{
    public function run()
    {
        $path = 'privacy/privacy.webp';
        PrivacyPolicy::create([
            'id'           => (string) Str::uuid(),
            'title'        => 'Privacy Policy',
            'introduction' => 'At Amo Market, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information.',
            'sections'     => json_encode([
                [
                    'title'   => 'Information Collection',
                    'content' => 'We collect information such as your name, contact details, and delivery address to provide you with the best possible service.',
                ],
                [
                    'title'   => 'Data Protection',
                    'content' => 'Your data is stored securely and will never be shared with third parties without your consent.',
                ],
                [
                    'title'   => 'Security Measures',
                    'content' => 'Our team is committed to maintaining the confidentiality and integrity of your information. We continuously review and enhance our security measures to protect your data from unauthorized access.',
                ],
            ]),
            'image_path'          => Storage::disk('public')->url($path),
            'company_description' => 'Amo Market, your trusted partner in fast and reliable delivery services. We are dedicated to connecting local shops and markets with end-users, ensuring that you get the freshest and highest-quality products right at your doorstep. Our mission is to make your life easier by providing a seamless shopping experience.',
        ]);
    }
}
