import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Dev = 'dev',
  Prod = 'prod',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: string;

  @IsString()
  APP_NAME: string;

  @IsString()
  APP_SECRETE: string;

  @IsString()
  APP_URL: string;

  @IsString()
  SERVER_URL: string;

  @IsNumber()
  PORT: number;

  @IsString()
  UPLOAD_PATH: string;

  @IsString()
  PG_HOST: string;

  @IsNumber()
  PG_PORT: number;

  @IsString()
  PG_USERNAME: string;

  @IsNumber()
  PG_PASSWORD: number;

  @IsString()
  PG_DB: string;

  @IsString()
  SMTP_HOST: string;

  @IsNumber()
  SMTP_PORT: number;

  @IsString()
  SMTP_USERNAME: string;

  @IsString()
  SMTP_PASSWORD: string;

  @IsString()
  EMAIL_FROM: string;

  @IsBoolean()
  ENABLE_BULLMQ: boolean;

  @IsString()
  REDIS_HOST: string;

  @IsNumber()
  REDIS_PORT: number;

  @IsString()
  REDIS_USERNAME: string;

  @IsString()
  REDIS_PASSWORD: string;
}

export function configValidator(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
