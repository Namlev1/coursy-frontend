import { getRedisClient } from './redis';
import apiClient from '@/api/client';
import { PlatformConfig } from '@/types/platformConfig';
import { getPlatformId } from '@/utils/headerUtils';

const CACHE_TTL = 3600; // 1 hour in seconds
const CACHE_KEY_PREFIX = 'platform:config:';

export const getCachedConfig = async (): Promise<PlatformConfig> => {
  const platformId = await getPlatformId();

  const cacheKey = `${CACHE_KEY_PREFIX}${platformId}`;

  try {
    // Try to get from Redis first
    const redis = await getRedisClient();
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }
  } catch (redisError) {
    console.error('Redis error, falling back to direct fetch:', redisError);
    // Continue to backend fetch if Redis fails
  }

  // Cache miss or Redis error - fetch from backend
  try {
    const response = await apiClient.get<PlatformConfig>(
      `/api/platforms/${platformId}/config`,
      {
        headers: {
          'x-platform-id': platformId,
        },
      }
    );

    const config: PlatformConfig = response.data;

    // Try to cache the result (don't fail if Redis is down)
    try {
      const redis = await getRedisClient();
      await redis.setEx(cacheKey, CACHE_TTL, JSON.stringify(config));
      console.log(`Cached config for platform ${platformId}`);
    } catch (cacheError) {
      console.error('Failed to cache config:', cacheError);
      // Don't throw - we have the config, caching is just optimization
    }

    return config;
  } catch (backendError) {
    console.error('Failed to fetch config from backend:', backendError);
    throw new Error(`Failed to fetch config for platform ${platformId}`);
  }
};

// Optional: Helper to invalidate cache when config changes
export const invalidateConfigCache = async (
  platformId: string
): Promise<void> => {
  const cacheKey = `${CACHE_KEY_PREFIX}${platformId}`;

  try {
    const redis = await getRedisClient();
    await redis.del(cacheKey);
    console.log(`Invalidated cache for platform ${platformId}`);
  } catch (error) {
    console.error('Failed to invalidate cache:', error);
  }
};
