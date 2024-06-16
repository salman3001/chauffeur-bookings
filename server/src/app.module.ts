import { Module } from '@nestjs/common';
import { UsersAppModule } from './users-app/users-app.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, UsersAppModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
