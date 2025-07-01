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
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('sub_category_id')->nullable(); // Use uuid for sub_category_id
            $table->string('name');
            $table->string('image')->nullable();
            $table->string('weight')->nullable();
            $table->decimal('price', 8, 2);
            $table->decimal('original_price', 8, 2)->nullable();
            $table->string('discount')->nullable();
            $table->string('delivery_time')->nullable();
            $table->text('about_product')->nullable();
            $table->string('unit');
            $table->longText('product_code')->nullable();
            $table->tinyInteger('status');
            $table->timestamps();
            $table->softDeletes();

            // Add foreign key constraint with uuid
            $table->foreign('sub_category_id')->references('id')->on('sub_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
