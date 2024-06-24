import { Module } from '@nestjs/common';
import { ConfigModule as MainConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import bullMqConfig from './bullMq.config';
import emailsConfig from './emails.config';
import redisConfig from './redis.config';
import smtpConfig from './smtp.config';
import typeormConfig from './typeorm.config';
import { configValidator } from './configValidator';

@Module({
  imports: [
    MainConfigModule.forRoot({
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
  ],
})
export class ConfigModule {}
