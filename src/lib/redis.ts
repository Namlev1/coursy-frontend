import { createClient, RedisClientType } from 'redis';

let client: RedisClientType | null = null;

export const getRedisClient = async (): Promise<RedisClientType> => {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      // password: process.env.REDIS_PASSWORD || 'redis'
    });

    client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    client.on('connect', () => {
      console.log('Connected to Redis');
    });

    await client.connect();
  }

  return client;
};

export const disconnectRedis = async (): Promise<void> => {
  if (client) {
    await client.destroy();
    client = null;
  }
};
