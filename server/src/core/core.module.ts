import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import bullMqConfig from './config/bullMq.config';
import emailsConfig from './config/emails.config';
import redisConfig from './config/redis.config';
import smtpConfig from './config/smtp.config';
import typeormConfig, { TypeormConfig } from './config/typeorm.config';
import { configValidator } from './config/configValidator';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [
        appConfig,
        bullMqConfig,
        emailsConfig,
        redisConfig,
        smtpConfig,
        typeormConfig,
      ],
      validate: configValidator,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeormConfig>('typeormConfig'),
        entities: [],
        migrations: [],
      }),
    }),
    BullModule.forRoot({
      connection: {},
    }),
    // BullModule.forRootAsync({
    //   useFactory: (config: ConfigService) => ({
    //     connection: {
    //       host: config.get<Config>().envs().REDIS_HOST,
    //       port: config.get<Config>().envs().REDIS_PORT,
    //       // username: config.get<Config>().envs().REDIS_USERNAME,
    //       // password: config.get<Config>().envs().REDIS_PASSWORD,
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [],
})
export class CoreModule {}
