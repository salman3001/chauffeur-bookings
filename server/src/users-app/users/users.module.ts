import { Module } from '@nestjs/common';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { userPolicy } from './user.policy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    PolicyModule.register([{ token: 'userPolicy', policy: userPolicy }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
