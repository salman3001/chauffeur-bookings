import { registerAs } from '@nestjs/config';

const uploadsConfig = {
  UPLOAD_PATH: process.env.UPLOAD_PATH as string,
};

export default registerAs('uploadsConfig', () => uploadsConfig);
