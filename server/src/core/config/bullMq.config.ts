import { registerAs } from '@nestjs/config';

const bullMqConfig = {
  enableBullMq: process.env.ENABLE_BULLMQ === 'true',
};

export default registerAs('bullMqConfig', () => bullMqConfig);
