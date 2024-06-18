import { Controller, Get, Body, Patch } from '@nestjs/common';
import { AdminProfilesService } from './admin-profiiles.service';
import { UpdateAdminProfileDto } from './dto/update-admin-profiile.dto';
import { AuthUser } from 'src/core/utils/decorators/user/authUser.decorator';
import { AuthUserType } from 'src/core/utils/types/common';
import ValidatorPipe from 'src/core/utils/pipes/ValidatorPipe';

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
