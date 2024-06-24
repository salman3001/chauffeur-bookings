import { Controller, Get, Body, Patch } from '@nestjs/common';
import { ChauffeurProfilesService } from './chauffeur-profiles.service';
import { UpdateChauffeurProfileDto } from './dto/update-chauffeur-profile.dto';
import { AuthUser } from 'src/utils/decorators/user/authUser.decorator';
import { AuthUserType } from 'src/utils/types/common';
import ValidatorPipe from 'src/utils/pipes/ValidatorPipe';

@Controller('my-chauffeur-profiles')
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

  @Patch()
  async update(
    @Body(new ValidatorPipe())
    updateChauffeurProfileDto: UpdateChauffeurProfileDto,
    @AuthUser() authUser: AuthUserType,
  ) {
    const chauffeurProfile = await this.chauffeurProfilesService.update(
      updateChauffeurProfileDto,
      authUser,
    );
    return chauffeurProfile;
  }
}
