<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('applicants', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('application_id');
            $table->foreign('application_id')
                ->references('id')
                ->on('applications')
                ->onDelete('cascade');

            $table->string('name');
            $table->string('status')->default('pending');
            $table->string('email');
            $table->string('phone');
            $table->string('photo')->nullable();
            $table->json('members')->nullable();
            $table->enum('applicants_type', ['student', 'teacher', 'faculty', 'startup', 'self'])->default('student');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applicants');
    }
};
