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
        Schema::create('sub_categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('category_id')->nullable(); // Use uuid for category_id
            $table->string('name');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->longText('product_code')->nullable();
            $table->tinyInteger('status');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint with UUID
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subcategories');
    }
};
