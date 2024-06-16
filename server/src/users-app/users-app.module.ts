import { Module } from '@nestjs/common';
import registerTypeOrm from './db/RegisterTypeOrm';
import { UsersController } from './controllers/users.controller';
import { ProfilesController } from './controllers/profiles.controller';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { ProfilesService } from './services/profiles.service';
import { AuthService } from './services/auth.service';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { userPolicy } from './policies/user.policy';
import { profilePolicy } from './policies/pofilePolicy';

@Module({
  imports: [
    registerTypeOrm(),
    PolicyModule.register([
      { token: 'userPolicy', policy: userPolicy },
      { token: 'profilePolicy', policy: profilePolicy },
    ]),
  ],
  controllers: [UsersController, ProfilesController, AuthController],
  providers: [UsersService, ProfilesService, AuthService],
})
export class UsersAppModule {}
