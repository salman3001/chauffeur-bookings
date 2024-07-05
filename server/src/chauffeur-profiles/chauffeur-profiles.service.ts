import { Inject, Injectable } from '@nestjs/common';
import { UpdateChauffeurProfileDto } from './dto/update-chauffeur-profile.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IChauffeurProfilesPolicy } from './chauffeur-profiles.policy';
import { AuthUserType } from 'src/utils/types/common';
import { ChauffeurProfileRepository } from './chuffeur-profile.repository';
import { CarRepository } from 'src/cars/car.repository';
import { AvailabilityRepository } from './availability/availability.repository';

@Injectable()
export class ChauffeurProfilesService {
  constructor(
    @Inject('ChauffeurProfilesPolicy')
    private readonly chauffeurProfilesPolicy: PolicyService<IChauffeurProfilesPolicy>,
    private chauffeurProfileRepo: ChauffeurProfileRepository,
    private carRepo: CarRepository,
    private availabilityRepo: AvailabilityRepository,
  ) {}

  async findOne(authUser: AuthUserType) {
    const chauffeurProfile = await this.chauffeurProfileRepo.findOneOrFail({
      where: { user: { id: authUser?.id } },
      relations: { user: true },
    });

    this.chauffeurProfilesPolicy.authorize('find', authUser, chauffeurProfile);
    return chauffeurProfile;
  }

  async update(
    id: number,
    updateChauffeurProfileDto: UpdateChauffeurProfileDto,
    authUser: AuthUserType,
  ) {
    const chauffeurProfile = await this.chauffeurProfileRepo.findOneOrFail({
      where: { id: id },
      relations: { user: true },
    });

    this.chauffeurProfilesPolicy.authorize(
      'update',
      authUser,
      chauffeurProfile,
    );

    const { availability, carId, ...restPayload } = updateChauffeurProfileDto;

    this.chauffeurProfileRepo.merge(chauffeurProfile, restPayload);

    if (carId) {
      const car = await this.carRepo.findOneByOrFail({ id: carId });
      chauffeurProfile.car = car;
    }

    if (availability) {
      await this.availabilityRepo.save({
        ...availability,
        chauffeurProfile: chauffeurProfile,
      });
    }

    await this.chauffeurProfileRepo.save(chauffeurProfile);
    return chauffeurProfile;
  }
}
