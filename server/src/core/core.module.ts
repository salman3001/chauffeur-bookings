import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@salman3001/nest-config-module';
import { MailModule } from '@salman3001/nest-mailer';
import { Config } from './config/config';
import registerTypeOrm from './db/RegisterTypeOrm';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule.register({
      config: new Config(),
      envFile: '.env',
    }),
    registerTypeOrm(),
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
    MailModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transporter: 'nodemailer',
        options: {
          host: config.get<Config>().envs().SMTP_HOST,
          port: config.get<Config>().envs().SMTP_PORT,
          secure: false,
          auth: {
            user: config.get<Config>().envs().SMTP_USERNAME,
            pass: config.get<Config>().envs().SMTP_PASSWORD,
          },
        },
        // queueAdapter: {
        //   name: 'BullMq',
        //   options: { connection: {} },
        // },
      }),
    }),
  ],
  providers: [],
})
export class CoreModule {}
