<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBannerPagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('banner_pages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('shop_id')->nullable(); // Use uuid for shop_id
            $table->string('title');
            $table->string('content_image')->nullable();
            $table->tinyInteger('status');
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint with uuid
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('banner_pages');
    }
}
