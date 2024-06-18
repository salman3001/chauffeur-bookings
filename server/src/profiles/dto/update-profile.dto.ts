import { PartialType, PickType } from '@nestjs/mapped-types';
import Profile from '../entities/profile.entity';

export class UpdateProfileDto extends PartialType(PickType(Profile, [])) {}
