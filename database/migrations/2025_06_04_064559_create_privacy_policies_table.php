<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::create('privacy_policies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('introduction');
            $table->json('sections'); // For storing multiple policy sections
            $table->string('image_path')->default('image/privacy.webp');
            $table->text('company_description');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('privacy_policies');
    }
};
