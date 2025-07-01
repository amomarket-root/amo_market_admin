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
        Schema::create('product_information', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('product_id')->nullable(); // Change to uuid for product_id
            $table->text('product_type')->nullable();
            $table->text('product_flavour')->nullable();
            $table->text('product_Ingredients')->nullable();
            $table->longText('product_attraction')->nullable();
            $table->text('key_features')->nullable();
            $table->text('fssai_license')->nullable();
            $table->text('other_license')->nullable();
            $table->string('shelf_life')->nullable();
            $table->text('manufacturer_details')->nullable();
            $table->text('seller')->nullable();
            $table->text('seller_fssai')->nullable();
            $table->text('country_of_origin')->nullable();
            $table->text('state_of_origin')->nullable();
            $table->text('return_policy')->nullable();
            $table->text('disclaimer')->nullable();
            $table->string('second_unit_weight')->nullable();
            $table->decimal('second_unit_price', 8, 2)->nullable();
            $table->decimal('second_unit_original_price', 8, 2)->nullable();
            $table->string('second_unit_discount')->nullable();
            $table->string('total_second_unit')->nullable();
            $table->string('second_unit_image')->nullable();
            $table->string('third_unit_weight')->nullable();
            $table->decimal('third_unit_price', 8, 2)->nullable();
            $table->decimal('third_unit_original_price', 8, 2)->nullable();
            $table->string('third_unit_discount')->nullable();
            $table->string('total_third_unit')->nullable();
            $table->string('third_unit_image')->nullable();
            $table->string('product_image_one')->nullable();
            $table->string('product_image_two')->nullable();
            $table->string('product_image_three')->nullable();
            $table->string('product_image_four')->nullable();
            $table->string('product_image_five')->nullable();
            $table->longText('product_extra_image')->nullable();
            $table->tinyInteger('status');
            $table->timestamps();
            $table->softDeletes();

            // Add foreign key constraint with uuid
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_information');
    }
};
