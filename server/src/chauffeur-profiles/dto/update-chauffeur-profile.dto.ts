import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AvailabilityByDay {
  @ApiProperty({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @ApiProperty({ default: false })
  @IsNotEmpty()
  @IsBoolean()
  fullDay: boolean;

  @ApiProperty({ default: null, type: String })
  @ValidateIf((o) => {
    if (o.available === true && o.fullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsDateString()
  from: string | null;

  @ApiProperty({ default: null, type: String })
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
  @ApiProperty()
  @ValidateNested()
  sunday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  monday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  tuesday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  wednesday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  thursday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  friday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  saturday: AvailabilityByDay;
}

export class UpdateChauffeurProfileDto {
  @ApiProperty()
  @IsNumber()
  pricePerHour: string;

  @ApiProperty()
  @IsOptional()
  availability?: Availability;
}
