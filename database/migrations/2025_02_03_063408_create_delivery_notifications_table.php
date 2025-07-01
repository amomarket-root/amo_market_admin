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
        Schema::create('delivery_notifications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('delivery_person_id'); // Foreign key to delivery_persons
            $table->uuid('order_id'); // Foreign key to orders
            $table->decimal('total_amount', 10, 2);
            $table->boolean('is_read')->default(false);
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('delivery_person_id')->references('id')->on('delivery_persons')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_notifications');
    }
};
