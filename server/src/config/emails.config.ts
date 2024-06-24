import { registerAs } from '@nestjs/config';

const emailsConfig = registerAs('emailsConfig', () => ({
  emailFrom: process.env.SMTP_PASSWORD as string,
}));

export type EmailsConfig = ReturnType<typeof emailsConfig>;

export default emailsConfig;
