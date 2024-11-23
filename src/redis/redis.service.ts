import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient({
      password: 'FKZAHGth00mEI9iPZRxKRpyouwCU6BEI',
      socket: {
        host: 'redis-18974.c244.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 18974,
      },
    });

    this.redisClient.connect().catch((err) => {
      console.error('Error connecting to Redis:', err);
    });
  }

  async setCache(key: string, value: string, ttl: number) {
    await this.redisClient.setEx(key, ttl, value);
  }

  async getCache(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async disconnect() {
    await this.redisClient.quit();
  }
}
