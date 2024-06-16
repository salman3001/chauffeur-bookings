import { OmitType } from '@nestjs/mapped-types';
import User from '../entities/user.entity';

export class CreateUserDto extends OmitType(User, [
  'id',
  'isActive',
  'otp',
  'profile',
  'socketToken',
  'cretaedAt',
  'updatedAt',
  'deletedAt',
]) {}
