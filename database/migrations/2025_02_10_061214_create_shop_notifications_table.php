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
        Schema::create('shop_notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('shop_id'); // Foreign key to delivery_persons
            $table->uuid('order_id'); // Foreign key to orders
            $table->decimal('total_amount', 10, 2);
            $table->boolean('is_read')->default(false);
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_notifications');
    }
};
