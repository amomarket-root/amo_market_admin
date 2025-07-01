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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('order_id')->unique(); // Unique order ID
            $table->uuid('user_id'); // UUID foreign key to users table
            $table->uuid('delivery_person_id')->nullable(); // UUID foreign key to delivery_persons table, nullable
            $table->uuid('address_id')->nullable(); // UUID foreign key to addresses table, nullable
            $table->uuid('user_cart_id')->nullable(); // UUID foreign key to user_carts table, nullable
            $table->decimal('total_amount', 10, 2); // Total order amount
            $table->enum('order_status', ['pending', 'accepted', 'preparing', 'on_the_way', 'reached', 'delivered'])->default('pending'); // For order acceptance/decline
            $table->string('payment_method'); // Payment method (e.g., Cards, UPI, etc.)
            $table->string('payment_id')->nullable(); // Payment ID
            $table->enum('payment_status', ['pending', 'success', 'failed'])->default('pending'); // Payment status
            $table->timestamp('estimated_delivery')->nullable();
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('delivery_person_id')->references('id')->on('delivery_persons')->onDelete('cascade');
            $table->foreign('address_id')->references('id')->on('addresses')->onDelete('set null');
            $table->foreign('user_cart_id')->references('id')->on('user_carts')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
