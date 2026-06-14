<?php

use App\Http\Controllers\AnalysisController;
use Illuminate\Support\Facades\Route;

Route::post('/analyze', [AnalysisController::class, 'analyze']);
Route::get('/history', [AnalysisController::class, 'history']);
Route::get('/analysis/{id}', [AnalysisController::class, 'show']);