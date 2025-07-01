<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('delivery_persons', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->nullable(); // Use uuid for user_id
            $table->string('name');
            $table->string('number')->unique()->nullable();
            $table->string('driving_license')->nullable();
            $table->string('license_document')->nullable();
            $table->string('PAN_Number');
            $table->string('PAN_Photo')->nullable();
            $table->enum('delivery_mode', ['motorcycle', 'electric_vehicle', 'bicycle'])->nullable();
            $table->string('vehicle_number');
            $table->string('location');
            $table->string('latitude');
            $table->string('longitude');
            $table->float('rating', 3)->nullable();
            $table->tinyInteger('online_status');
            $table->tinyInteger('status');
            $table->timestamps();

            // Foreign key constraint for user_id only
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->unique();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('delivery_persons', function (Blueprint $table) {
            // Drop foreign key constraints
            $table->dropForeign(['user_id']);
        });

        Schema::dropIfExists('delivery_persons');
    }
};
