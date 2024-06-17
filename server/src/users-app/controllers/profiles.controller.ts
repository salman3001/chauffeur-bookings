import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { AuthUser } from 'src/core/utils/decorators/user/authUser.decorator';
import { AuthUserType } from 'src/core/utils/types/common';

@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async findOne(@AuthUser() authUser: AuthUserType) {
    const profle = await this.profilesService.findOne(authUser);
    return profle;
  }

  @Patch()
  async update(
    @Body() updateProfileDto: UpdateProfileDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const profile = this.profilesService.update(updateProfileDto, authUser);
    return profile;
  }
}
