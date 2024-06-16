import { Module } from '@nestjs/common';
import { UsersAppModule } from './users-app/users-app.module';

@Module({
  imports: [UsersAppModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
