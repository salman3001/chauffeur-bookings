import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { profilePolicy } from './pofilePolicy';

@Module({
  imports: [
    PolicyModule.register([{ token: 'profilePolicy', policy: profilePolicy }]),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
