<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('imgcategories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('image')->optional(); // optional image for the category
            $table->string('name'); // e.g., "Events", "Workshops"
            $table->text('description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imgcategories');
    }
};
