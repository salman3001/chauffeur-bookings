import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ChauffeurProfilesService } from './chauffeur-profiles.service';
import { UpdateChauffeurProfileDto } from './dto/update-chauffeur-profile.dto';
import { AuthUserType } from 'src/utils/types/common';
import { AuthUser } from 'src/utils/decorators/authUser.decorator';

@Controller('chauffeur-profiles')
export class ChauffeurProfilesController {
  constructor(
    private readonly chauffeurProfilesService: ChauffeurProfilesService,
  ) {}

  @Get()
  async findOne(@AuthUser() authUser: AuthUserType) {
    const chauffeurProfile =
      await this.chauffeurProfilesService.findOne(authUser);
    return chauffeurProfile;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateChauffeurProfileDto: UpdateChauffeurProfileDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const chauffeurProfile = await this.chauffeurProfilesService.update(
      +id,
      updateChauffeurProfileDto,
      authUser,
    );
    return chauffeurProfile;
  }
}
