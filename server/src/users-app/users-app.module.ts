import { Module } from '@nestjs/common';
import registerTypeOrm from './db/RegisterTypeOrm';
import { UsersController } from './controllers/users.controller';
import { ProfilesController } from './controllers/profiles.controller';
import { AuthController } from './controllers/auth.controller';
import { RolesController } from './controllers/roles.controller';
import { AddressesController } from './controllers/addresses.controller';
import { UsersService } from './services/users.service';
import { AddressesService } from './services/addresses.service';
import { ProfilesService } from './services/profiles.service';
import { AuthService } from './services/auth.service';
import { RolesService } from './services/roles.service';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { userPolicy } from './policies/user.policy';
import { addressPolicy } from './policies/address.policy';
import { rolePolicy } from './policies/rolePolicy';
import { profilePolicy } from './policies/pofilePolicy';

@Module({
  imports: [
    registerTypeOrm(),
    PolicyModule.register([
      { token: 'userPolicy', policy: userPolicy },
      { token: 'addressPolicy', policy: addressPolicy },
      { token: 'rolePolicy', policy: rolePolicy },
      { token: 'profilePolicy', policy: profilePolicy },
    ]),
  ],
  controllers: [
    UsersController,
    ProfilesController,
    AuthController,
    RolesController,
    AddressesController,
  ],
  providers: [
    UsersService,
    ProfilesService,
    AuthService,
    RolesService,
    AddressesService,
  ],
})
export class UsersAppModule {}
