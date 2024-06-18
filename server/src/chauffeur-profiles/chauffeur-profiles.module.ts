import { Module } from '@nestjs/common';
import { ChauffeurProfilesService } from './chauffeur-profiles.service';
import { ChauffeurProfilesController } from './chauffeur-profiles.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { ChauffeurProfilesPolicy } from './chauffeur-profiles.policy';

@Module({
  imports: [
    PolicyModule.register([
      {
        token: 'ChauffeurProfilesPolicy',
        policy: ChauffeurProfilesPolicy,
      },
    ]),
  ],
  controllers: [ChauffeurProfilesController],
  providers: [ChauffeurProfilesService],
})
export class ChauffeurProfilesModule {}
