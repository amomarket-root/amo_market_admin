<?php

namespace Database\Seeders;

use App\Models\Avatar;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AvatarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $avatars = [];
        $now     = Carbon::now();

        for ($i = 1; $i <= 20; $i++) {
            $extension = ($i === 4) ? 'png' : 'jpg';
            $fileName  = "avatar{$i}.{$extension}";
            $filePath  = "avatar/{$fileName}";

            $avatars[] = [
                'id'         => (string) Str::uuid(),
                'path'       => Storage::disk('public')->url($filePath),
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        Avatar::insert($avatars);
    }
}
