import { PartialType, PickType } from '@nestjs/mapped-types';
import Profile from '../entities/profile.entity';
import { IsOptional } from 'class-validator';

export class UpdateProfileDto extends PartialType(PickType(Profile, [])) {
  @IsOptional()
  salman: string;
}
