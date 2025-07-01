<?php

namespace Database\Seeders;

use App\Models\SecurityPage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SecurityPageSeeder extends Seeder
{
    public function run()
    {
        $path = 'security/security.webp';
        SecurityPage::create([
            'id'               => (string) Str::uuid(),
            'title'            => 'Security',
            'introduction'     => 'At Amo Market, your security and privacy are our top priorities. We are committed to ensuring that your personal information and transactions are protected at all times.',
            'content_sections' => json_encode([
                [
                    'content' => 'We use advanced encryption technologies to safeguard your data during transmission and storage. This ensures that your sensitive information, such as payment details and personal data, remains secure.',
                ],
                [
                    'content' => 'Our platform complies with industry-standard security protocols and regulations. We regularly update our systems and conduct security audits to identify and address potential vulnerabilities.',
                ],
                [
                    'content' => 'Your trust is important to us. That\'s why we have implemented strict access controls and authentication measures to prevent unauthorized access to your account. We also provide you with tools to manage your privacy settings and control how your data is used.',
                ],
                [
                    'content' => 'If you have any questions or concerns about your security or privacy, our dedicated support team is here to assist you. At Amo Market, we are committed to providing you with a safe and secure shopping experience.',
                ],
                [
                    'content' => 'Thank you for trusting us with your security. We will continue to work tirelessly to protect your information and provide you with peace of mind.',
                ],
            ]),
            'image_path' => Storage::disk('public')->url($path),
        ]);
    }
}
