import { PartialType, PickType } from '@nestjs/mapped-types';
import { AdminProfile } from '../entities/admin-profile.entity';

export class UpdateAdminProfileDto extends PartialType(
  PickType(AdminProfile, []),
) {}
