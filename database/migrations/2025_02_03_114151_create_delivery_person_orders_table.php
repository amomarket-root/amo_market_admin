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
        Schema::create('delivery_person_orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('delivery_person_id'); // UUID foreign key to delivery_persons table
            $table->uuid('order_id'); // UUID foreign key to orders table
            $table->string('generate_order_id');
            $table->decimal('delivery_amount', 10, 2);
            $table->enum('payment_status', ['pending', 'success', 'failed'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->nullable();

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('delivery_person_id')->references('id')->on('delivery_persons')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_person_orders');
    }
};
