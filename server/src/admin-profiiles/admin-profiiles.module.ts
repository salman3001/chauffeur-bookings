import { Module } from '@nestjs/common';
import { AdminProfilesService } from './admin-profiiles.service';
import { AdminProfilesController } from './admin-profiiles.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { AdminProfilesPolicy } from './admin-profiles.policy';

@Module({
  imports: [
    PolicyModule.register([
      {
        token: 'AdminProfilesPolicy',
        policy: AdminProfilesPolicy,
      },
    ]),
  ],
  controllers: [AdminProfilesController],
  providers: [AdminProfilesService],
})
export class AdminProfilesModule {}
