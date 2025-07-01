<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->nullable(); // Use uuid for user_id
            $table->uuid('shop_document_id')->nullable(); // Keep the column but remove the foreign key constraint
            $table->string('name');
            $table->string('number')->unique()->nullable();
            $table->string('image')->nullable();
            $table->string('profile_picture')->nullable();
            $table->float('rating', 3)->nullable();
            $table->string('review')->nullable();
            $table->string('time');
            $table->string('offer')->nullable();
            $table->text('description');
            $table->string('location');
            $table->string('latitude');
            $table->string('longitude');
            $table->tinyInteger('online_status');
            $table->tinyInteger('status');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint for user_id only
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->unique();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });

        Schema::dropIfExists('shops');
    }
}
