import { registerAs } from '@nestjs/config';

const emailsConfig = {
  EMAIL_FROM: process.env.SMTP_PASSWORD as string,
};

export default registerAs('emailsConfig', () => emailsConfig);
