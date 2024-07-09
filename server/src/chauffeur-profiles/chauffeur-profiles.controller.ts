import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ChauffeurProfilesService } from './chauffeur-profiles.service';
import { UpdateChauffeurProfileDto } from './dto/update-chauffeur-profile.dto';
import { AuthUserType } from 'src/utils/types/common';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';
import CustomRes from 'src/utils/CustomRes';

@Controller('chauffeur-profile')
export class ChauffeurProfilesController {
  constructor(
    private readonly chauffeurProfilesService: ChauffeurProfilesService,
  ) {}

  @Get()
  async findOne(@AuthUser() authUser: AuthUserType) {
    const chauffeurProfile =
      await this.chauffeurProfilesService.findOne(authUser);
    return CustomRes({
      code: 200,
      success: true,
      data: chauffeurProfile,
    });
  }

  @Get(':userId')
  async findOneByUserId(
    @Param('userId') userId: string,
    @AuthUser() authUser: AuthUserType,
  ) {
    const chauffeurProfile =
      await this.chauffeurProfilesService.findOneByUserId(+userId, authUser);
    return CustomRes({
      code: 200,
      success: true,
      data: chauffeurProfile,
    });
  }

  @Patch(':userId')
  async updateByUserId(
    @Param('userId') userId: string,
    @Body()
    updateChauffeurProfileDto: UpdateChauffeurProfileDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const chauffeurProfile = await this.chauffeurProfilesService.updateByUserId(
      +userId,
      updateChauffeurProfileDto,
      authUser,
    );
    return CustomRes({
      code: 200,
      success: true,
      data: chauffeurProfile,
    });
  }
}
