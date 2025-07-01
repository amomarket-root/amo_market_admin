<?php

namespace App\Services;

use App\Models\DeliveryPerson;
use App\Models\Order;
use App\Models\Role;
use App\Models\Shop;
use App\Models\User;
use App\Models\UserCart;
use Carbon\Carbon;

class ReportService
{
    public function generateDataReport(string $timeRange = 'all_time')
    {
        $dateRange = $this->getDateRange($timeRange);

        return [
            'customer_count'         => $this->getCustomerCount($dateRange),
            'shop_stats'             => $this->getShopStats($dateRange),
            'delivery_person_stats'  => $this->getDeliveryPersonStats($dateRange),
            'order_stats'            => $this->getOrderStats($dateRange),
            'platform_revenue'       => $this->getPlatformRevenue($dateRange),
            'feeding_india_donation' => $this->getFeedingIndiaDonation($dateRange),
            'armed_force_donation'   => $this->getArmedForceDonation($dateRange),
        ];
    }

    protected function getDateRange(string $timeRange): ?array
    {
        $now = Carbon::now();

        return match ($timeRange) {
            'last_day'     => [$now->copy()->subDay(), $now],
            'last_7_days'  => [$now->copy()->subDays(7), $now],
            'last_14_days' => [$now->copy()->subDays(14), $now],
            'last_30_days' => [$now->copy()->subDays(30), $now],
            'last_90_days' => [$now->copy()->subDays(90), $now],
            default        => null, // all time
        };
    }

    protected function getCustomerCount(?array $dateRange): int
    {
        $customerRole = Role::where('name', 'Customer')->first();
        $query        = User::where('role_id', $customerRole->id);

        if ($dateRange) {
            $query->whereBetween('created_at', $dateRange);
        }

        return $query->count();
    }

    protected function getShopStats(?array $dateRange): array
    {
        $retailerRole = Role::where('name', 'Retailer')->first();
        $query        = Shop::query();

        if ($dateRange) {
            $query->whereBetween('created_at', $dateRange);
        }

        return [
            'total'    => $query->count(),
            'active'   => $query->clone()->where('status', 1)->count(),
            'inactive' => $query->clone()->where('status', 0)->count(),
        ];
    }

    protected function getDeliveryPersonStats(?array $dateRange): array
    {
        $query = DeliveryPerson::query();

        if ($dateRange) {
            $query->whereBetween('created_at', $dateRange);
        }

        return [
            'total'    => $query->count(),
            'active'   => $query->clone()->where('status', 1)->count(),
            'inactive' => $query->clone()->where('status', 0)->count(),
        ];
    }

    protected function getOrderStats(?array $dateRange): array
    {
        $query = Order::query();

        if ($dateRange) {
            $query->whereBetween('created_at', $dateRange);
        }

        return [
            'total'       => $query->count(),
            'completed'   => $query->clone()->where('order_status', 'delivered')->count(),
            'in_progress' => $query->clone()->where('order_status', '!=', 'delivered')->count(),
        ];
    }

    protected function getPlatformRevenue(?array $dateRange): float
    {
        $query = UserCart::query();

        if ($dateRange) {
            $query->whereBetween('created_at', $dateRange);
        }

        return (float) $query->sum('platform_charge');
    }

    protected function getFeedingIndiaDonation(?array $dateRange): int
    {
        $query = UserCart::where('feeding_india_donation', true);

        if ($dateRange) {
            $query->whereBetween('created_at', $dateRange);
        }

        return $query->count();
    }

    protected function getArmedForceDonation(?array $dateRange): int
    {
        $query = UserCart::where('india_armed_force_contribution', true);

        if ($dateRange) {
            $query->whereBetween('created_at', $dateRange);
        }

        return $query->count();
    }
}
