import { IConfig } from '@salman3001/nest-config-module';

export class Config implements IConfig {
  envs() {
    return {
      NODE_ENV: process.env.NODE_ENV as string,
      APP_NAME: process.env.APP_NAME as string,
      APP_URL: process.env.APP_URL as string,
      PORT: process.env.PORT as string,
      APP_SECRETE: process.env.APP_SECRETE as string,
      DB_URI: process.env.DB_URI as string,
      PG_HOST: process.env.PG_HOST as string,
      PG_PORT: process.env.PG_PORT as string,
      PG_USERNAME: process.env.PG_USERNAME as string,
      PG_PASSWORD: process.env.PG_PASSWORD as string,
      PG_DB: process.env.PG_DB as string,
      SMTP_HOST: process.env.SMTP_HOST as string,
      SMTP_PORT: process.env.SMTP_PORT as unknown as number,
      SMTP_USERNAME: process.env.SMTP_USERNAME as string,
      SMTP_PASSWORD: process.env.SMTP_PASSWORD as string,
    };
  }
  // pagination
  defaultPerPage = 20;
}
