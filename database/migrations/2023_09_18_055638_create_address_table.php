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
        Schema::create('addresses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id'); // Use uuid for user_id
            $table->string('full_name');
            $table->string('phone_number');
            $table->string('alternative_number')->nullable();
            $table->string('pin_code');
            $table->string('state');
            $table->string('city');
            $table->string('building_details');
            $table->string('location');
            $table->string('is_default')->nullable();
            $table->string('address_type')->nullable();
            $table->string('delivery_note')->nullable();
            $table->tinyInteger('status');
            $table->string('full_address');
            $table->string('latitude');
            $table->string('longitude');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint with UUID
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('address');
    }
};
