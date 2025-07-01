<?php

namespace App\Http\Controllers\Location;

use App\Http\Controllers\Controller;
use App\Models\DeliveryPerson;
use App\Models\Shop;
use App\Models\UserLocationHistory;
use Illuminate\Http\Request;

class LocationTrackController extends Controller
{
    public function getPopularLocations(Request $request)
    {
        $timeRange = $request->input('time_range', 'last_7_days');

        $query = UserLocationHistory::selectRaw(
            'ROUND(latitude, 4) as lat,
            ROUND(longitude, 4) as lng,
            COUNT(*) as user_count'
        )
            ->groupBy('lat', 'lng')
            ->orderBy('user_count', 'desc')
            ->limit(100);

        // Apply time range filter
        switch ($timeRange) {
            case 'last_day':
                $query->where('created_at', '>=', now()->subDay());
                break;
            case 'last_7_days':
                $query->where('created_at', '>=', now()->subDays(7));
                break;
            case 'last_14_days':
                $query->where('created_at', '>=', now()->subDays(14));
                break;
            case 'last_30_days':
                $query->where('created_at', '>=', now()->subDays(30));
                break;
            case 'last_90_days':
                $query->where('created_at', '>=', now()->subDays(90));
                break;
                // 'all_time' doesn't need additional filtering
        }

        $locations = $query->get();

        return response()->json($locations);
    }

    public function getShopLocations(Request $request)
    {
        $timeRange = $request->input('time_range', 'last_7_days');

        $query = Shop::selectRaw(
            'ROUND(latitude, 4) as lat,
         ROUND(longitude, 4) as lng,
         COUNT(*) as total_shop,
         SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as active_shop,
         SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) as inactive_shop'
        )
            ->groupBy('lat', 'lng')
            ->orderBy('total_shop', 'desc')
            ->limit(100);

        // Optional: Filter by time range using created_at
        switch ($timeRange) {
            case 'last_day':
                $query->where('created_at', '>=', now()->subDay());
                break;
            case 'last_7_days':
                $query->where('created_at', '>=', now()->subDays(7));
                break;
            case 'last_14_days':
                $query->where('created_at', '>=', now()->subDays(14));
                break;
            case 'last_30_days':
                $query->where('created_at', '>=', now()->subDays(30));
                break;
            case 'last_90_days':
                $query->where('created_at', '>=', now()->subDays(90));
                break;
                // No filtering for 'all_time'
        }

        $locations = $query->get();

        return response()->json($locations);
    }

    public function getDeliveryBoyLocations(Request $request)
    {
        $timeRange = $request->input('time_range', 'last_7_days');

        $query = DeliveryPerson::selectRaw(
            'ROUND(latitude, 4) as lat,
         ROUND(longitude, 4) as lng,
         COUNT(*) as total_delivery_boy,
         SUM(CASE WHEN online_status = 1 THEN 1 ELSE 0 END) as active_delivery_boy,
         SUM(CASE WHEN online_status = 0 THEN 1 ELSE 0 END) as inactive_delivery_boy'
        )
            ->groupBy('lat', 'lng')
            ->orderBy('total_delivery_boy', 'desc')
            ->limit(100);

        // Optional: Filter by time range using created_at
        switch ($timeRange) {
            case 'last_day':
                $query->where('created_at', '>=', now()->subDay());
                break;
            case 'last_7_days':
                $query->where('created_at', '>=', now()->subDays(7));
                break;
            case 'last_14_days':
                $query->where('created_at', '>=', now()->subDays(14));
                break;
            case 'last_30_days':
                $query->where('created_at', '>=', now()->subDays(30));
                break;
            case 'last_90_days':
                $query->where('created_at', '>=', now()->subDays(90));
                break;
                // No filtering for 'all_time'
        }

        $locations = $query->get();

        return response()->json($locations);
    }
}
