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
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('shop_id')->nullable(); // Use uuid for shop_id
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('content_image')->nullable();
            $table->string('image')->nullable();
            $table->tinyInteger('status');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint with UUID
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
