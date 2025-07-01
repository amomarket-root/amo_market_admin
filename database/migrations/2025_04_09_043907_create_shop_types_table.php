<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopTypesTable extends Migration
{
    public function up()
    {
        Schema::create('shop_types', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->boolean('has_services')->default(false);
            $table->boolean('delivery_charge')->default(false); // New column
            $table->boolean('platform_charge')->default(false); // New column
            $table->timestamps();
        });

        Schema::table('shops', function (Blueprint $table) {
            $table->uuid('shop_type_id')->nullable()->after('user_id');
            $table->foreign('shop_type_id')
                ->references('id')
                ->on('shop_types')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropForeign(['shop_type_id']);
            $table->dropColumn('shop_type_id');
        });
        Schema::dropIfExists('shop_types');
    }
}
