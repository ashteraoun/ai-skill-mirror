<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Analysis extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_input',
        'talent_score',
        'skills_breakdown',
        'career_suggestions',
        'improvement_roadmap',
        'ai_summary'
    ];

    protected $casts = [
        'skills_breakdown' => 'array',
        'career_suggestions' => 'array',
        'improvement_roadmap' => 'array',
        'talent_score' => 'integer'
    ];
}