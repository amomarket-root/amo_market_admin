<?php

namespace App\Services;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class OrderDetailsAnalyticService
{
    public function getMonthlyOrderStats()
    {
        $currentYear = Carbon::now()->year;

        $monthlyStats = Order::select(
            DB::raw('MONTH(orders.created_at) as month'),
            DB::raw('COUNT(*) as total_orders'),
            DB::raw('SUM(total_amount) as total_income'),
            DB::raw('SUM(user_carts.platform_charge) as platform_charge') // Fixed this line
        )
            ->leftJoin('user_carts', 'orders.user_cart_id', '=', 'user_carts.id')
            ->whereYear('orders.created_at', $currentYear)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Format the results
        $result = [];
        foreach ($monthlyStats as $stat) {
            $monthName = Carbon::create()->month($stat->month)->format('F');
            $result[]  = [
                'month'           => $monthName,
                'total_orders'    => $stat->total_orders,
                'total_income'    => $stat->total_income,
                'platform_charge' => $stat->platform_charge,
            ];
        }

        return $result;
    }

    public function getCurrentWeekOrderStats()
    {
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek   = Carbon::now()->endOfWeek();

        $weeklyStats = Order::select(
            DB::raw('COUNT(*) as total_orders'),
            DB::raw('SUM(total_amount) as total_income'),
            DB::raw('SUM(user_carts.platform_charge) as platform_charge') // Also fixed here for consistency
        )
            ->leftJoin('user_carts', 'orders.user_cart_id', '=', 'user_carts.id')
            ->whereBetween('orders.created_at', [$startOfWeek, $endOfWeek])
            ->first();

        return [
            'start_date'      => $startOfWeek->format('Y-m-d'),
            'end_date'        => $endOfWeek->format('Y-m-d'),
            'total_orders'    => $weeklyStats->total_orders    ?? 0,
            'total_income'    => $weeklyStats->total_income    ?? 0,
            'platform_charge' => $weeklyStats->platform_charge ?? 0,
        ];
    }

    public function getTopOrderLocations($limit = 10)
    {
        return Order::select(
            DB::raw("CONCAT(addresses.city, ', ', addresses.state) as location"),
            DB::raw('COUNT(*) as order_count')
        )
            ->join('addresses', 'orders.address_id', '=', 'addresses.id')
            ->groupBy('addresses.city', 'addresses.state')
            ->orderByDesc('order_count')
            ->limit($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'location'    => $item->location, // Now contains "City, State"
                    'order_count' => $item->order_count,
                ];
            });
    }

    public function getOrderStatusStats()
    {
        return Order::select(
            'order_status',
            DB::raw('COUNT(*) as count')
        )
            ->groupBy('order_status')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->status => $item->count];
            });
    }
}
