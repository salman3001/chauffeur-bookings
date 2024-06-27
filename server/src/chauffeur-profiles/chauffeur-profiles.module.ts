import { Module } from '@nestjs/common';
import { ChauffeurProfilesService } from './chauffeur-profiles.service';
import { ChauffeurProfilesController } from './chauffeur-profiles.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { ChauffeurProfilesPolicy } from './chauffeur-profiles.policy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChauffeurProfile } from './entities/chauffeur-profile.entity';
import { ChauffeurProfileRepository } from './chuffeur-profile.repository';
import { CarRepository } from 'src/cars/car.repository';
import { Car } from 'src/cars/entities/car.entity';

@Module({
  imports: [
    PolicyModule.register([
      {
        token: 'ChauffeurProfilesPolicy',
        policy: ChauffeurProfilesPolicy,
      },
    ]),
    TypeOrmModule.forFeature([ChauffeurProfile, Car]),
  ],
  controllers: [ChauffeurProfilesController],
  providers: [
    ChauffeurProfilesService,
    ChauffeurProfileRepository,
    CarRepository,
  ],
})
export class ChauffeurProfilesModule {}
