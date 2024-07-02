import {
  Controller,
  Get,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthUserType } from 'src/utils/types/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import { fileFilter } from 'src/files/helpers/fileFIlter';
import CustomRes from 'src/utils/CustomRes';

@Controller('my-profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async findOne(@AuthUser() authUser: AuthUserType) {
    const profile = await this.profilesService.findOne(authUser);
    return CustomRes({
      code: 200,
      data: profile,
      success: true,
    });
  }

  @Patch()
  @UseInterceptors(
    FileInterceptor(
      'avatar',
      fileFilter({
        maxSizeInMb: 5,
        mimeType: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
      }),
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: UploadAvatarDto,
  })
  async update(
    @Body() updateProfileDto: UpdateProfileDto,
    @AuthUser() authUser: AuthUserType,
    @UploadedFile()
    avatar?: Express.Multer.File,
  ) {
    const profile = this.profilesService.update(
      updateProfileDto,
      authUser,
      avatar,
    );
    return CustomRes({
      code: 201,
      data: profile,
      success: true,
    });
  }
}
