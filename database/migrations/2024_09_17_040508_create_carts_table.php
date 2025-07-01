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
        Schema::create('carts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->nullable(); // For authenticated users
            $table->uuid('shop_id'); // For shop
            $table->uuid('product_id')->nullable(); // For product
            $table->uuid('service_id')->nullable(); // For service
            $table->integer('quantity')->default(1);
            $table->decimal('price', 10, 2); // Price at the time of adding to cart
            $table->tinyInteger('status'); // 0: Inactive, 1: Active
            $table->timestamps();

            // Foreign key constraints using UUID
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
