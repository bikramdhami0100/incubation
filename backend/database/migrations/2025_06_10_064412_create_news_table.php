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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->string('category');
            $table->text('description');
            $table->foreignId('added_by')->index();
            $table->string('news_photo')->nullable();
            $table->foreign('added_by')->references('id')->on('admins')->onDelete('cascade');

        });
        // Schema::create('news_photo', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        //     $table->foreignId('news_id')->index();
        //     $table->string('news_photo');
        //     $table->foreign('news_id')->references('news_id')->on('news')->onDelete('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
