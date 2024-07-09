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
      relations: { user: true, availability: true, car: true },
    });

    this.chauffeurProfilesPolicy.authorize('find', authUser, chauffeurProfile);
    return chauffeurProfile;
  }

  async findOneByUserId(userId: number, authUser: AuthUserType) {
    const chauffeurProfile = await this.chauffeurProfileRepo.findOneOrFail({
      where: { user: { id: userId } },
      relations: { user: true, availability: true, car: true },
    });

    this.chauffeurProfilesPolicy.authorize(
      'findById',
      authUser,
      chauffeurProfile,
    );
    return chauffeurProfile;
  }

  async updateByUserId(
    userId: number,
    updateChauffeurProfileDto: UpdateChauffeurProfileDto,
    authUser: AuthUserType,
  ) {
    const chauffeurProfile = await this.chauffeurProfileRepo.findOneOrFail({
      where: { user: { id: userId } },
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
      const existingAvailability = await this.availabilityRepo.findOne({
        where: {
          chauffeurProfile: {
            id: chauffeurProfile.id,
          },
        },
      });

      if (existingAvailability) {
        this.availabilityRepo.merge(existingAvailability, availability);
        await this.availabilityRepo.save(existingAvailability);
      } else {
        await this.availabilityRepo.save({
          ...availability,
          chauffeurProfile: chauffeurProfile,
        });
      }
    }

    await this.chauffeurProfileRepo.save(chauffeurProfile);
    return chauffeurProfile;
  }
}
