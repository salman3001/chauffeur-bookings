import { PartialType, PickType } from '@nestjs/mapped-types';
import { ChauffeurProfile } from '../entities/chauffeur-profile.entity';

export class UpdateChauffeurProfileDto extends PartialType(
  PickType(ChauffeurProfile, []),
) {}
