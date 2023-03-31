// redis-config.service.ts
import { Injectable } from '@nestjs/common';
import {
  RedisModuleOptions,
  RedisOptionsFactory,
} from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
  createRedisOptions(): RedisModuleOptions {
    return {
      readyLog: true,
      config: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD,
      },
    };
  }
}
