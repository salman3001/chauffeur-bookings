import { registerAs } from '@nestjs/config';

const redisConfig = registerAs('redisConfig', () => ({
  redisHost: process.env.REDIS_HOST as string,
  redisPort: parseInt(process.env.REDIS_PORT || '0'),
  redisUsername: process.env.REDIS_USERNAME as string,
  redistPassword: process.env.REDIS_PASSWORD as string,
}));

export type RedisConfig = ReturnType<typeof redisConfig>;

export default redisConfig;
