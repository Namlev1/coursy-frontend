import { createClient, RedisClientType } from 'redis';

let client: RedisClientType | null = null;

export const getRedisClient = async (): Promise<RedisClientType> => {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
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