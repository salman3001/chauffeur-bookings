import { Module } from '@nestjs/common';
import { AdminProfilesService } from './admin-profiles.service';
import { AdminProfilesController } from './admin-profiles.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { AdminProfilesPolicy } from './admin-profiles.policy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminProfile } from './entities/admin-profile.entity';
import { AdminProfileRepository } from './admin-profile.repository';

@Module({
  imports: [
    PolicyModule.register([
      {
        token: 'AdminProfilesPolicy',
        policy: AdminProfilesPolicy,
      },
    ]),
    TypeOrmModule.forFeature([AdminProfile]),
  ],
  controllers: [AdminProfilesController],
  providers: [AdminProfilesService, AdminProfileRepository],
})
export class AdminProfilesModule {}
