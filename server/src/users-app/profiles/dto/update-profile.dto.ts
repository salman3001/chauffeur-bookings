import { OmitType, PartialType } from '@nestjs/mapped-types';
import Profile from '../entities/profile.entity';

export class UpdateProfileDto extends PartialType(
  OmitType(Profile, ['id', 'avatar']),
) {}
