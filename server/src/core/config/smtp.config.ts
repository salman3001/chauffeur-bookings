import { registerAs } from '@nestjs/config';

const smtpConfig = {
  smtpHost: process.env.SMTP_HOST as string,
  smtpPort: process.env.SMTP_PORT as unknown as number,
  smtpUsername: process.env.SMTP_USERNAME as string,
  smtpPassword: process.env.SMTP_PASSWORD as string,
};

export default registerAs('smtpConfig', () => smtpConfig);
