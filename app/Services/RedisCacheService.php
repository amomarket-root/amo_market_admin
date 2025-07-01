<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class RedisCacheService
{
    protected $defaultTtl;

    protected $prefix;

    public function __construct()
    {
        $this->defaultTtl = 6 * 60 * 60; // 6 hours in seconds
        $this->prefix     = config('cache.prefix').':';
    }

    public function remember(string $key, callable $callback, ?int $ttl = null)
    {
        $fullKey = $this->prefix.$key;
        $ttl     = $ttl ?? $this->defaultTtl;

        try {
            return Cache::store('redis')->remember($fullKey, $ttl, $callback);
        } catch (\Exception $e) {
            Log::error("Redis cache failed for key {$fullKey}: ".$e->getMessage());

            return $callback();
        }
    }

    public function forget(string $key): bool
    {
        $fullKey = $this->prefix.$key;

        try {
            return Cache::store('redis')->forget($fullKey);
        } catch (\Exception $e) {
            Log::error("Failed to forget Redis cache key {$fullKey}: ".$e->getMessage());

            return false;
        }
    }

    public function flushByPrefix(string $prefix): bool
    {
        $fullPrefix = $this->prefix.$prefix;

        try {
            $redis = Redis::connection();
            $keys  = $redis->keys($fullPrefix.'*');

            if (! empty($keys)) {
                // Remove Laravel's internal prefix from keys
                $laravelPrefix = config('database.redis.options.prefix', '');
                $keys          = array_map(fn ($key) => str_replace($laravelPrefix, '', $key), $keys);

                $redis->del($keys);

                return true;
            }

            return false;
        } catch (\Exception $e) {
            Log::error("Failed to flush Redis cache with prefix {$fullPrefix}: ".$e->getMessage());

            return false;
        }
    }

    public function lock(string $key, int $seconds = 10)
    {
        $fullKey = $this->prefix.'lock:'.$key;

        try {
            // Use the Redis facade to create a lock
            return Redis::connection()->lock($fullKey, $seconds);
        } catch (\Exception $e) {
            Log::error("Failed to acquire lock for key {$fullKey}: ".$e->getMessage());
            throw $e;
        }
    }

    public function getPrefix(): string
    {
        return $this->prefix;
    }

    public function setDefaultTtl(int $seconds): void
    {
        $this->defaultTtl = $seconds;
    }

    public function flushAllUserCaches(string $userPrefix): void
    {
        $this->flushByPrefix($userPrefix.'list:');
        $this->flushByPrefix($userPrefix.'profile:');
    }
}
