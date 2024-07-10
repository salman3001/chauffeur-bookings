import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenvConfig({ path: '.env' });

const dbPath = resolve(process.cwd(), 'data');

if (!existsSync(dbPath)) {
  mkdirSync(dbPath);
}

const typeormConfig: TypeOrmModuleOptions & SeederOptions = {
  type: 'sqlite',
  // host: process.env.PG_HOST,
  // port: parseInt(process.env.PG_PORT || '5432'),
  // username: process.env.PG_USERNAME,
  // password: process.env.PG_PASSWORD,
  database: resolve(dbPath, process.env.SQLITE_FILE || 'db.sqlite'),
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/db/migrations/**/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  seeds: ['src/db/seeds/*{.ts,.js}'],
  factories: ['src/**/factory/*{.ts,.js}'],
  extra: {
    foreign_keys: true,
  },
};
export type TypeormConfig = typeof typeormConfig;

export const connectionSource = new DataSource(
  typeormConfig as DataSourceOptions,
);

export default registerAs('typeormConfig', () => typeormConfig);
