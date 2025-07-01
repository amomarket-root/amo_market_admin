<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('order_feedbacks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('order_id');
            $table->uuid('user_id');
            $table->uuid('shop_id');
            $table->uuid('delivery_person_id')->nullable();
            $table->unsignedTinyInteger('shop_rating')->nullable();
            $table->unsignedTinyInteger('delivery_rating')->nullable();
            $table->enum('packaging_quality', ['good', 'bad'])->nullable();
            $table->text('comments')->nullable();
            $table->timestamps();

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('shop_id')->references('id')->on('shops')->onDelete('cascade');
            $table->foreign('delivery_person_id')->references('id')->on('delivery_persons')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('order_feedbacks');
    }
};
