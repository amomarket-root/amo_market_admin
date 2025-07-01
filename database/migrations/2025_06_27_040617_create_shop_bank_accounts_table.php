<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shop_bank_accounts', function (Blueprint $table) {
            $table->uuid('id')->primary()->default(Str::uuid());
            $table->uuid('shop_id');
            $table->string('account_holder_name');
            $table->string('account_number');
            $table->string('bank_name');
            $table->string('branch_name');
            $table->string('ifsc_code');
            $table->string('account_type')->comment('savings, current');
            $table->string('upi_id')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->float('name_match_score')->nullable();
            $table->json('verification_response')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('shop_id')
                ->references('id')
                ->on('shops')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_bank_accounts');
    }
};
