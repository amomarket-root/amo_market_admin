<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('shop_id')->nullable(); // Add shop_id as UUID foreign key
            $table->string('PAN_Number');
            $table->string('PAN_Photo')->nullable();
            $table->string('FSSAI_Licence');
            $table->string('FSSAI_Licence_Document')->nullable();
            $table->string('GST_number');
            $table->string('GST_Document')->nullable();
            $table->string('Shop_Licence');
            $table->string('Shop_Licence_Document')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Add index for the foreign key
            $table->index('shop_id');

            // Add foreign key constraint for shop_id (references the 'id' column of 'shops' table)
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
        Schema::dropIfExists('shop_documents');
    }
}
