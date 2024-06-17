import { Module } from '@nestjs/common';
import { UsersAppModule } from './users-app/users-app.module';
import { CoreModule } from './core/core.module';
import { CustomersAppModule } from './customers-app/customers-app.module';

@Module({
  imports: [CoreModule, UsersAppModule, CustomersAppModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
