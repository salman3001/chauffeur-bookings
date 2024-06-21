import { PartialType, PickType } from '@nestjs/mapped-types';
import { ChauffeurProfile } from '../entities/chauffeur-profile.entity';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AvailabilityByDay {
  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @IsNotEmpty()
  @IsBoolean()
  fullDay: boolean;

  @ValidateIf((o) => {
    if (o.available === true && o.fullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsDateString()
  from: string | null;

  @ValidateIf((o) => {
    if (o.available === true && o.fullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsDateString()
  to: string | null;
}

class Availability {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => AvailabilityByDay)
  sunday: AvailabilityByDay;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => AvailabilityByDay)
  monday: AvailabilityByDay;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => AvailabilityByDay)
  tuesday: AvailabilityByDay;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => AvailabilityByDay)
  wednesday: AvailabilityByDay;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => AvailabilityByDay)
  thursday: AvailabilityByDay;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => AvailabilityByDay)
  friday: AvailabilityByDay;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(24)
  @Type(() => AvailabilityByDay)
  saturday: AvailabilityByDay;
}

export class UpdateChauffeurProfileDto extends PartialType(
  PickType(ChauffeurProfile, []),
) {
  @IsOptional()
  availability?: Availability;
}
