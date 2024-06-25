import { registerAs } from '@nestjs/config';

const appConfig = registerAs('appConfig', () => ({
  nodeEnv: process.env.NODE_ENV as string,
  appName: process.env.APP_NAME as string,
  appUrl: process.env.APP_URL as string,
  serverUrl: process.env.SERVER_URL as string,
  port: process.env.PORT as string,
  appSecrete: process.env.APP_SECRETE as string,
  defaultPerPage: parseInt(process.env.DEFAULT_PER_PAGE || '20'),
  uploadsPath: process.env.UPLOAD_PATH as string,
}));

export type AppConfig = ReturnType<typeof appConfig>;
export default appConfig;
