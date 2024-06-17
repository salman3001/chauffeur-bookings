import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@salman3001/nest-config-module';
import { MailModule } from '@salman3001/nest-mailer';
import { Config } from './config/config';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.register({
      config: new Config(),
      envFile: '.env',
    }),
    MailModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transporter: 'nodemailer',
        options: {
          host: config.get<Config>().envs().SMTP_HOST,
          port: config.get<Config>().envs().PORT,
          secure: false,
          auth: {
            user: config.get<Config>().envs().SMTP_USERNAME,
            pass: config.get<Config>().envs().SMTP_PASSWORD,
          },
        },
      }),
    }),
  ],
})
export class CoreModule {}
