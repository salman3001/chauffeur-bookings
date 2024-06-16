import { Module } from '@nestjs/common';
import { ConfigModule } from '@salman3001/nest-config-module';
import { Config } from './config/config';

@Module({
  imports: [
    ConfigModule.register({
      config: new Config(),
      envFile:
        process.env.NODE_ENV === 'prod'
          ? '.env.prod'
          : process.env.NODE_ENV === 'dev'
            ? '.env.dev'
            : '.env.dev',
    }),
  ],
})
export class CoreModule {}
