<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('service_information', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('sub_category_id')->nullable();
            $table->string('service_type'); // AC, Beauty, Car, etc.
            $table->longText('service_extra_image')->nullable();
            $table->decimal('base_price', 10, 2)->nullable();
            $table->decimal('discounted_price', 10, 2)->nullable();

            $table->json('service_options')->nullable(); // actual services (screen repair, software, etc.)
            $table->json('type_options')->nullable(); // optional: like variants
            $table->json('size_options')->nullable(); // like device/TV sizes
            $table->json('location_options')->nullable(); // shop vs home
            $table->json('time_slots')->nullable(); // slots + express
            $table->json('additional_options')->nullable(); // e.g., warranty, priority, etc.

            $table->integer('estimated_duration')->comment('In minutes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Add foreign key constraint with uuid
            $table->foreign('sub_category_id')->references('id')->on('sub_categories')->onDelete('cascade');
            $table->index('service_type');
        });
    }

    public function down()
    {
        Schema::dropIfExists('service_information');
    }
};
