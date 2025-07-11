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
        Schema::create('gallery_images', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('imgcategory_id')->constrained()->onDelete('cascade'); // links to categories
            $table->string('title')->nullable(); // optional title for the image
            $table->text('description')->nullable(); // optional description
            $table->json('images')->nullable(); // store image filename or path
            $table->string('uploaded_by')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery_images');
    }
};
