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
        Schema::create('account_deletions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('user_name')->nullable();
            $table->string('user_email')->nullable();
            $table->string('user_contact_number')->nullable();
            $table->string('reason'); // Stores the reason for deletion
            $table->text('feedback')->nullable(); // Optional feedback
            $table->timestamps(); // Stores created_at and updated_at

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_deletions');
    }
};
