import { Controller, Get, Body, Patch } from '@nestjs/common';
import { AdminProfilesService } from './admin-profiles.service';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';
import { AuthUser } from 'src/utils/decorators/user/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import ValidatorPipe from 'src/utils/pipes/ValidatorPipe';

@Controller('my-admin-profiiles')
export class AdminProfilesController {
  constructor(private readonly adminProfilesService: AdminProfilesService) {}

  @Get()
  async findOne(@AuthUser() authUser: AuthUserType) {
    const profile = await this.adminProfilesService.findOne(authUser);
    return profile;
  }

  @Patch()
  async update(
    @Body(new ValidatorPipe()) updateAdminProfileDto: UpdateAdminProfileDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const profile = await this.adminProfilesService.update(
      updateAdminProfileDto,
      authUser,
    );
    return profile;
  }
}
