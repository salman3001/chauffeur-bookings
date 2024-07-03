import { Inject, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IProfilePolicy } from './pofilePolicy';
import { AuthUserType } from 'src/utils/types/common';
import { ProfileRepository } from './profile.repository';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject('profilePolicy')
    private readonly profilePolicy: PolicyService<IProfilePolicy>,
    private profileRepo: ProfileRepository,
    private fileSearvice: FilesService,
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
      const oldImages = profile.avatar;
      const images = await this.fileSearvice.uploadImage(
        avatar,
        '/images/avatars',
      );

      profile.avatar = images;

      if (oldImages) {
        await this.fileSearvice.deleteFile(oldImages.url);
        await this.fileSearvice.deleteFile(oldImages.thumbnailUrl);
      }
    }

    this.profileRepo.merge(profile, {});

    return this.profileRepo.save(profile);
  }

  async myAvatar(authUser: AuthUserType) {
    this.profilePolicy.authorize('find', authUser);
    const profile = await this.profileRepo.findOneOrFail({
      where: {
        user: {
          id: authUser?.id,
        },
      },
    });

    return profile.avatar;
  }
}
