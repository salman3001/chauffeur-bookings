import { PartialType, PickType } from '@nestjs/mapped-types';
import { ChauffeurProfile } from '../entities/chauffeur-profile.entity';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Slot {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsBoolean()
  available: boolean;
}

class Availability {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => Slot)
  sunday: Slot[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => Slot)
  moday: Slot[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => Slot)
  tuesday: Slot[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => Slot)
  wednesday: Slot[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => Slot)
  thursday: Slot[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => Slot)
  friday: Slot[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => Slot)
  saturday: Slot[];
}

export class UpdateChauffeurProfileDto extends PartialType(
  PickType(ChauffeurProfile, []),
) {
  @IsOptional()
  availability?: Availability;
}
