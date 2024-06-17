import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@salman3001/nest-config-module';
import { MailModule } from '@salman3001/nest-mailer';
import { Config } from './config/config';
import registerTypeOrm from './db/RegisterTypeOrm';
import { KafkaModule } from './kafka/kafka.module';
import { EmailConsumer } from './consumers/email.consumer';

@Module({
  imports: [
    ConfigModule.register({
      config: new Config(),
      envFile: '.env',
    }),
    registerTypeOrm(),
    MailModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transporter: 'nodemailer',
        options: {
          host: config.get<Config>().envs().SMTP_HOST,
          port: config.get<Config>().envs().SMTP_PORT,
          secure: false,
          auth: {
            user: config.get<Config>().envs().SMTP_USERNAME,
            pass: config.get<Config>().envs().SMTP_PASSWORD,
          },
          // tls: {
          //   // do not fail on invalid certs
          //   rejectUnauthorized: false,
          // },
        },
      }),
    }),
    KafkaModule,
  ],
  providers: [EmailConsumer],
})
export class CoreModule {}
