import { Inject, Injectable } from '@nestjs/common';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { PolicyService } from '@salman3001/nest-policy-module';
import { AuthUserType } from 'src/core/utils/types/common';
import { IadminProfilesPolicy } from './admin-profiles.policy';
import { AdminProfileRepository } from './admin-profile.repository';

@Injectable()
export class AdminProfilesService {
  constructor(
    @Inject('AdminProfilesPolicy')
    private readonly adminProfilesPolicy: PolicyService<IadminProfilesPolicy>,
    @InjectDataSource()
    private readonly adminProfileRepo: AdminProfileRepository,
  ) {}

  async findOne(authUser: AuthUserType) {
    const adminProfile = await this.adminProfileRepo.findOneOrFail({
      where: { id: authUser?.id },
      relations: { user: true },
    });

    this.adminProfilesPolicy.authorize('find', authUser, adminProfile);
    return adminProfile;
  }

  async update(
    updateAdminProfileDto: UpdateAdminProfileDto,
    authUser: AuthUserType,
  ) {
    const adminProfile = await this.adminProfileRepo.findOneOrFail({
      where: { id: authUser?.id },
      relations: { user: true },
    });

    this.adminProfilesPolicy.authorize('update', authUser, adminProfile);

    Object.assign(adminProfile, updateAdminProfileDto);
    await this.adminProfileRepo.save(adminProfile);
    return adminProfile;
  }
}
