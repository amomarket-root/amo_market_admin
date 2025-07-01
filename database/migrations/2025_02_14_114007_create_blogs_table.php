<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('main_title');

            // Updated category field with enum constraint
            $table->enum('category', [
                'shop',
                'delivery',
                'customer',
                'promotion',
                'reward',
                'product',
                'service',
            ])->default('shop'); // Set default value if needed

            $table->date('date');
            $table->string('location')->nullable();
            $table->string('custom_url')->nullable();
            $table->string('multimedia')->nullable();
            $table->string('header')->nullable();
            $table->text('description')->nullable();
            $table->json('other_images')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
