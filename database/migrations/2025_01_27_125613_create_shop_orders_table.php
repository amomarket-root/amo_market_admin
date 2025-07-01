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
        Schema::create('shop_orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('shop_id'); // UUID foreign key to shops table
            $table->uuid('order_id'); // UUID foreign key to orders table
            $table->string('generate_order_id');
            $table->enum('payment_status', ['pending', 'success', 'failed'])->default('pending');
            $table->decimal('total_amount', 10, 2);
            $table->enum('status', ['pending', 'accepted', 'declined'])->default('pending'); // For order acceptance/decline
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->nullable();

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
        Schema::dropIfExists('shop_orders');
    }
};
