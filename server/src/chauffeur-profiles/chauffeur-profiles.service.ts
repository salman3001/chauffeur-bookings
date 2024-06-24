import { Inject, Injectable } from '@nestjs/common';
import { UpdateChauffeurProfileDto } from './dto/update-chauffeur-profile.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IChauffeurProfilesPolicy } from './chauffeur-profiles.policy';
import { AuthUserType } from 'src/utils/types/common';
import { ChauffeurProfileRepository } from './chuffeur-profile.repository';

@Injectable()
export class ChauffeurProfilesService {
  constructor(
    @Inject('ChauffeurProfilesPolicy')
    private readonly chauffeurProfilesPolicy: PolicyService<IChauffeurProfilesPolicy>,
    private chauffeurProfileRepo: ChauffeurProfileRepository,
  ) {}

  async findOne(authUser: AuthUserType) {
    const chauffeurProfile = await this.chauffeurProfileRepo.findOneOrFail({
      where: { id: authUser?.id },
      relations: { user: true },
    });

    this.chauffeurProfilesPolicy.authorize('find', authUser, chauffeurProfile);
    return chauffeurProfile;
  }

  async update(
    updateChauffeurProfileDto: UpdateChauffeurProfileDto,
    authUser: AuthUserType,
  ) {
    const chauffeurProfile = await this.chauffeurProfileRepo.findOneOrFail({
      where: { id: authUser?.id },
      relations: { user: true },
    });

    this.chauffeurProfilesPolicy.authorize(
      'update',
      authUser,
      chauffeurProfile,
    );

    const { availability, ...restPayload } = updateChauffeurProfileDto;

    this.chauffeurProfileRepo.merge(chauffeurProfile, restPayload);

    if (availability) {
      chauffeurProfile.availability = availability;
    }

    await this.chauffeurProfileRepo.save(chauffeurProfile);
    return chauffeurProfile;
  }
}
