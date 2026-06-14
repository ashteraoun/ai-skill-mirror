<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('analyses', function (Blueprint $table) {
            $table->id();
            $table->text('user_input');
            $table->integer('talent_score');
            $table->json('skills_breakdown');
            $table->json('career_suggestions');
            $table->json('improvement_roadmap');
            $table->text('ai_summary');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('analyses');
    }
};