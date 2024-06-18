import { Inject, Injectable } from '@nestjs/common';
import { UpdateChauffeurProfileDto } from './dto/update-chauffeur-profile.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IChauffeurProfilesPolicy } from './chauffeur-profiles.policy';
import { AuthUserType } from 'src/core/utils/types/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ChauffeurProfile } from './entities/chauffeur-profile.entity';

@Injectable()
export class ChauffeurProfilesService {
  constructor(
    @Inject('ChauffeurProfilesPolicy')
    private readonly chauffeurProfilesPolicy: PolicyService<IChauffeurProfilesPolicy>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async findOne(authUser: AuthUserType) {
    const chauffeurProfile = await this.dataSource.manager.findOneOrFail(
      ChauffeurProfile,
      { where: { id: authUser?.id }, relations: { user: true } },
    );

    this.chauffeurProfilesPolicy.authorize('find', authUser, chauffeurProfile);
    return chauffeurProfile;
  }

  async update(
    updateChauffeurProfileDto: UpdateChauffeurProfileDto,
    authUser: AuthUserType,
  ) {
    const chauffeurProfile = await this.dataSource.manager.findOneOrFail(
      ChauffeurProfile,
      { where: { id: authUser?.id }, relations: { user: true } },
    );

    this.chauffeurProfilesPolicy.authorize(
      'update',
      authUser,
      chauffeurProfile,
    );

    Object.assign(chauffeurProfile, updateChauffeurProfileDto);
    await this.dataSource.manager.save(ChauffeurProfile, chauffeurProfile);
    return chauffeurProfile;
  }
}
