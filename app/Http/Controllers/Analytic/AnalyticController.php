<?php

namespace App\Http\Controllers\Analytic;

use App\Http\Controllers\Controller;
use App\Services\RedisCacheService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\OrderBy;
use Spatie\Analytics\Period;

class AnalyticController extends Controller
{
    protected $redisCache;

    protected $cacheTtl;

    protected $cachePrefix;

    public function __construct(RedisCacheService $redisCache)
    {
        $this->redisCache  = $redisCache;
        $this->cacheTtl    = 60 * 60; // 1 hour in seconds
        $this->cachePrefix = 'analytics:';
    }

    private function getPeriod($typePeriod)
    {
        switch ($typePeriod) {
            case 'last_day':
                $period = Period::create(Carbon::now(), Carbon::now());
                break;
            case 'last_7_days':
                $period = Period::days(7);
                break;
            case 'last_14_days':
                $period = Period::days(14);
                break;
            case 'last_30_days':
                $period = Period::days(30);
                break;
            case 'last_90_days':
                $period = Period::days(90);
                break;
            case 'all_time':
                $period = Period::create(Carbon::now()->subYears(7), Carbon::now());
                break;
            default:
                $period = Period::create(Carbon::now(), Carbon::now());
                break;
        }

        return $period;
    }

    public function getGoogleAnalyticData1(Request $request)
    {
        $typePeriod = $request->type_period ?? 'last_day';
        $cacheKey   = $this->cachePrefix.'data1:'.md5($typePeriod);

        return $this->redisCache->remember($cacheKey, function () use ($typePeriod) {
            $period = $this->getPeriod($typePeriod);

            $visitors      = Analytics::get($period, ['activeUsers', 'screenPageViews'], [], 0);
            $pageView      = Analytics::get($period, ['screenPageViews'], [], 0);
            $activeUsers   = Analytics::get($period, ['activeUsers', 'totalUsers'], [], 0);
            $totalVisitors = Analytics::get(Period::create(Carbon::now()->subYears(7), Carbon::now()), ['activeUsers', 'screenPageViews'], [], 0);
            $sessions      = Analytics::get($period, ['sessions'], [], 0);
            $bounceRate    = Analytics::get($period, ['bounceRate'], [], 0);

            return [
                'visitor'        => $visitors,
                'page_view'      => $pageView,
                'active_users'   => $activeUsers,
                'total_visitors' => $totalVisitors,
                'sessions'       => $sessions,
                'bounce_rate'    => $bounceRate,
            ];
        }, $this->cacheTtl);
    }

    public function getGoogleAnalyticData2(Request $request)
    {
        $typePeriod = $request->type_period ?? 'last_day';
        $cacheKey   = $this->cachePrefix.'data2:'.md5($typePeriod);

        return $this->redisCache->remember($cacheKey, function () use ($typePeriod) {
            $period = $this->getPeriod($typePeriod);

            $userTypes           = Analytics::get($period, ['activeUsers'], ['newVsReturning'], 0);
            $topBrowsers         = Analytics::get($period, ['totalUsers'], ['browser'], 0);
            $topOperatingSystems = Analytics::get($period, ['totalUsers'], ['operatingSystem'], 0);
            $topCountriesUsers   = Analytics::get($period, ['activeUsers', 'totalUsers'], ['country', 'countryId'], 0, [OrderBy::metric('totalUsers', true)]);
            $mostVisitedPages    = Analytics::get($period, ['screenPageViews', 'sessions'], ['pageTitle'], 0, [OrderBy::metric('sessions', true)]);
            $visitorsByState     = Analytics::get($period, ['activeUsers', 'totalUsers'], ['region'], 0, [OrderBy::metric('totalUsers', true)]);

            return [
                'user_types'            => $userTypes,
                'top_browser'           => $topBrowsers,
                'top_operating_systems' => $topOperatingSystems,
                'most_visited_pages'    => $mostVisitedPages,
                'top_countries_users'   => $topCountriesUsers,
                'visitors_by_state'     => $visitorsByState,
            ];
        }, $this->cacheTtl);
    }

    public function flushAnalyticsCache()
    {
        $this->redisCache->flushByPrefix($this->cachePrefix);

        return response()->json(['message' => 'Analytics cache flushed successfully']);
    }
}
