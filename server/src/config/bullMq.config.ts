import { registerAs } from '@nestjs/config';

const bullMqConfig = registerAs('bullMqConfig', () => ({
  enableBullMq: process.env.ENABLE_BULLMQ === 'true',
}));

export type BullMqConfig = ReturnType<typeof bullMqConfig>;
export default bullMqConfig;
