import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || '5432'),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/core/db/migrations/**/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};
export type TypeormConfig = typeof typeormConfig;

export default registerAs('typeormConfig', () => typeormConfig);
export const connectionSource = new DataSource(
  typeormConfig as DataSourceOptions,
);
