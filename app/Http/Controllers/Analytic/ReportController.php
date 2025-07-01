<?php

namespace App\Http\Controllers\Analytic;

use App\Http\Controllers\Controller;
use App\Services\ReportService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    protected $reportService;

    public function __construct(ReportService $reportService)
    {
        $this->reportService = $reportService;
    }

    public function getDataReport(Request $request): JsonResponse
    {
        $request->validate([
            'time_range' => 'sometimes|in:last_day,last_7_days,last_14_days,last_30_days,last_90_days,all_time',
        ]);

        $timeRange = $request->input('time_range', 'all_time');

        try {
            $report = $this->reportService->generateDataReport($timeRange);

            return response()->json([
                'message' => 'Data report generated successfully',
                'success' => true,
                'data'    => $report,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to generate report: '.$e->getMessage(),
                'success' => false,
            ], 500);
        }
    }
}
