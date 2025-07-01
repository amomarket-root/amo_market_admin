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
        Schema::create('user_carts', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Primary key
            $table->uuid('user_id'); // UUID foreign key to users table
            $table->uuid('address_id')->nullable(); // UUID foreign key to addresses table, nullable
            $table->json('cart_items'); // Store cart items in JSON format (e.g., product details, quantities, etc.)
            $table->decimal('delivery_charge', 8, 2)->default(0); // Delivery charge
            $table->decimal('platform_charge', 8, 2)->default(0); // Platform charge
            $table->boolean('feeding_india_donation')->default(false); // Donation checkbox status
            $table->boolean('india_armed_force_contribution')->default(false); // Armed forces contribution checkbox status
            $table->integer('tip_amount')->nullable(); // Tip amount for delivery
            $table->decimal('subtotal', 10, 2); // Subtotal amount before charges
            $table->decimal('grand_total', 10, 2); // Total amount including charges
            $table->tinyInteger('status');
            $table->timestamps(); // Created at and updated at

            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('address_id')->references('id')->on('addresses')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_carts');
    }
};
