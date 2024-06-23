import { Inject, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IProfilePolicy } from './pofilePolicy';
import { AuthUserType } from 'src/core/utils/types/common';
import { FileService } from 'src/core/files/file.service';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject('profilePolicy')
    private readonly profilePolicy: PolicyService<IProfilePolicy>,
    private profileRepo: ProfileRepository,
    private fileSearvice: FileService,
  ) {}

  async findOne(authUser: AuthUserType) {
    this.profilePolicy.authorize('find', authUser);
    const profile = await this.profileRepo.findOneOrFail({
      where: {
        user: {
          id: authUser?.id,
        },
      },
    });

    return profile;
  }

  async update(
    updateProfileDto: UpdateProfileDto,
    authUser: AuthUserType,
    avatar?: Express.Multer.File,
  ) {
    this.profilePolicy.authorize('update', authUser);
    const profile = await this.profileRepo.findOneOrFail({
      where: {
        user: {
          id: authUser?.id,
        },
      },
    });

    if (avatar) {
      const image = await this.fileSearvice.uploadImage(
        avatar,
        '/images/avatars',
      );

      profile.avatar = image;
    }

    this.profileRepo.merge(profile, updateProfileDto);
    await this.profileRepo.save(profile);

    return profile;
  }
}
