<?php

namespace App\Http\Controllers\Analytic;

use App\Http\Controllers\Controller;
use App\Services\OrderDetailsAnalyticService;
use Illuminate\Http\Request;

class OrderDetailsAnalyticController extends Controller
{
    protected $orderDetailsAnalyticService;

    public function __construct(OrderDetailsAnalyticService $orderDetailsAnalyticService)
    {
        $this->orderDetailsAnalyticService = $orderDetailsAnalyticService;
    }

    /**
     * Get monthly order statistics
     */
    public function monthlyOrderStats()
    {
        try {
            $stats = $this->orderDetailsAnalyticService->getMonthlyOrderStats();

            return response()->json([
                'success' => true,
                'data'    => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch monthly order statistics',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get current week order statistics
     */
    public function currentWeekOrderStats()
    {
        try {
            $stats = $this->orderDetailsAnalyticService->getCurrentWeekOrderStats();

            return response()->json([
                'success' => true,
                'data'    => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch current week order statistics',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get top order locations
     */
    public function topOrderLocations(Request $request)
    {
        try {
            $limit     = $request->input('limit', 5);
            $locations = $this->orderDetailsAnalyticService->getTopOrderLocations($limit);

            return response()->json([
                'success' => true,
                'data'    => $locations,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch top order locations',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get order status statistics
     */
    public function orderStatusStats()
    {
        try {
            $stats = $this->orderDetailsAnalyticService->getOrderStatusStats();

            return response()->json([
                'success' => true,
                'data'    => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch order status stats',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
