<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('user_location_history', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address', 45)->nullable();
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->text('state')->nullable();
            $table->text('city')->nullable();
            $table->timestamps();

            $table->index(['latitude', 'longitude']);
            $table->index('created_at');

        });
    }

    public function down()
    {
        Schema::dropIfExists('user_location_history');
    }
};
