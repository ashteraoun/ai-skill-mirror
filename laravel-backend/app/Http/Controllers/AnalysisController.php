<?php

namespace App\Http\Controllers;

use App\Models\Analysis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AnalysisController extends Controller
{
    public function analyze(Request $request)
    {
        $request->validate([
            'user_input' => 'required|string|min:10'
        ]);

        // Call Node.js AI Service
        $nodeServiceUrl = env('NODE_AI_SERVICE_URL', 'http://localhost:3001');
        
        try {
            $response = Http::timeout(30)->post($nodeServiceUrl . '/ai/analyze', [
                'text' => $request->user_input
            ]);

            if ($response->successful()) {
                $aiResult = $response->json();

                // Save to database
                $analysis = Analysis::create([
                    'user_input' => $request->user_input,
                    'talent_score' => $aiResult['talent_score'],
                    'skills_breakdown' => json_encode($aiResult['skills_breakdown']),
                    'career_suggestions' => json_encode($aiResult['career_suggestions']),
                    'improvement_roadmap' => json_encode($aiResult['improvement_roadmap']),
                    'ai_summary' => $aiResult['ai_summary']
                ]);

                return response()->json([
                    'success' => true,
                    'data' => $analysis,
                    'message' => 'Analysis completed successfully'
                ], 201);
            }

            return response()->json([
                'success' => false,
                'message' => 'AI service error'
            ], 500);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to analyze: ' . $e->getMessage()
            ], 500);
        }
    }

    public function history()
    {
        $analyses = Analysis::orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $analyses
        ]);
    }

    public function show($id)
    {
        $analysis = Analysis::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $analysis
        ]);
    }
}