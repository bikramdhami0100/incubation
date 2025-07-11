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
        Schema::create('applications', function (Blueprint $table) {
            $table->id(); // This is unsignedBigInteger by default
            $table->string("title");
            $table->text("description");
            $table->datetime("end_date")->nullable();
            $table->string("status")->default("open"); // open, closed, in-progress, completed
            $table->timestamps();
            
            // $table->string("group_members_no");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
