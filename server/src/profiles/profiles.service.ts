import { Inject, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IProfilePolicy } from './pofilePolicy';
import { AuthUserType } from 'src/core/utils/types/common';
import Profile from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @Inject('profilePolicy')
    private readonly profilePolicy: PolicyService<IProfilePolicy>,
  ) {}

  async findOne(authUser: AuthUserType) {
    this.profilePolicy.authorize('find', authUser);
    const profile = await this.dataSource.manager.findOneOrFail(Profile, {
      where: {
        user: {
          id: authUser?.id,
        },
      },
    });

    return profile;
  }

  async update(updateProfileDto: UpdateProfileDto, authUser: AuthUserType) {
    this.profilePolicy.authorize('update', authUser);
    const profile = await this.dataSource.manager.findOneOrFail(Profile, {
      where: {
        user: {
          id: authUser?.id,
        },
      },
    });

    Object.assign(profile, updateProfileDto);
    await this.dataSource.manager.save(Profile, profile);

    return profile;
  }
}
