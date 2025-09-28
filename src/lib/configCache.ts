import { getRedisClient } from './redis';
import { PlatformConfig } from '@/types/platformConfig';
import { getPlatformId } from '@/lib/headerUtils';
import { fetchConfig } from '@/lib/apiClient';

const CACHE_TTL = 3600; // 1 hour in seconds
const CACHE_KEY_PREFIX = 'platform:config:';

export const getCachedConfig = async (): Promise<PlatformConfig> => {
  const platformId = await getPlatformId();

  const cacheKey = `${CACHE_KEY_PREFIX}${platformId}`;

  try {
    // Try to get from Redis first
    const redis = await getRedisClient();
    const cached = await redis.get(cacheKey);

    // Cache hit
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (redisError) {
    console.error('Redis error, falling back to direct fetch:', redisError);
  }

  // Cache miss or Redis error - fetch from backend
  const config = await fetchConfig(platformId);
  try {
    const redis = await getRedisClient();
    await redis.setEx(cacheKey, CACHE_TTL, JSON.stringify(config));
    console.log(`Cached config for platform ${platformId}`);
  } catch (cacheError) {
    console.error('Failed to cache config:', cacheError);
    // Don't throw - we have the config, caching is just optimization
  }

  return config;
};
