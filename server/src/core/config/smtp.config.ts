import { registerAs } from '@nestjs/config';

const smtpConfig = registerAs('smtpConfig', () => ({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
}));

export type SmtpConfig = ReturnType<typeof smtpConfig>;
export default smtpConfig;
