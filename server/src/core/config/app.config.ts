import { registerAs } from '@nestjs/config';

const appConfig = {
  nodeEnv: process.env.NODE_ENV as string,
  appName: process.env.APP_NAME as string,
  appUrl: process.env.APP_URL as string,
  port: process.env.PORT as string,
  appSecrete: process.env.APP_SECRETE as string,
  defaultPerPage: parseInt(process.env.DEFAULT_PER_PAGE || '0'),
};

export default registerAs('appConfig', () => appConfig);
