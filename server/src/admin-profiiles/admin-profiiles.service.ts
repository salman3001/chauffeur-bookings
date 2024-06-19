import { Inject, Injectable } from '@nestjs/common';
import { UpdateAdminProfileDto } from './dto/update-admin-profiile.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { PolicyService } from '@salman3001/nest-policy-module';
import { DataSource } from 'typeorm';
import { AuthUserType } from 'src/core/utils/types/common';
import { AdminProfile } from './entities/admin-profiile.entity';
import { IadminProfilesPolicy } from './admin-profiles.policy';

@Injectable()
export class AdminProfilesService {
  constructor(
    @Inject('AdminProfilesPolicy')
    private readonly adminProfilesPolicy: PolicyService<IadminProfilesPolicy>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async findOne(authUser: AuthUserType) {
    const adminProfile = await this.dataSource.manager.findOneOrFail(
      AdminProfile,
      { where: { id: authUser?.id }, relations: { user: true } },
    );

    this.adminProfilesPolicy.authorize('find', authUser, adminProfile);
    return adminProfile;
  }

  async update(
    updateAdminProfileDto: UpdateAdminProfileDto,
    authUser: AuthUserType,
  ) {
    const adminProfile = await this.dataSource.manager.findOneOrFail(
      AdminProfile,
      { where: { id: authUser?.id }, relations: { user: true } },
    );

    this.adminProfilesPolicy.authorize('update', authUser, adminProfile);

    Object.assign(adminProfile, updateAdminProfileDto);
    await this.dataSource.manager.save(AdminProfile, adminProfile);
    return adminProfile;
  }
}
