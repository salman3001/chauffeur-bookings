import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsTimeString } from 'src/utils/validators/IsTimeString';
import { isTimeStringAfterField } from 'src/utils/validators/isTimeStringAfterField';

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
  @IsTimeString()
  from: string | null;

  @ApiProperty({ default: null, type: String })
  @ValidateIf((o) => {
    if (o.available === true && o.fullDay === false) {
      return true;
    } else {
      return false;
    }
  })
  @IsTimeString()
  @isTimeStringAfterField('from')
  to: string | null;
}

class Availability {
  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AvailabilityByDay)
  sunday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AvailabilityByDay)
  monday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AvailabilityByDay)
  tuesday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AvailabilityByDay)
  wednesday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AvailabilityByDay)
  thursday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AvailabilityByDay)
  friday: AvailabilityByDay;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AvailabilityByDay)
  saturday: AvailabilityByDay;
}

export class UpdateChauffeurProfileDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  carId: number;

  @ApiProperty()
  @IsString()
  pricePerHour: string;

  @ApiProperty()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Availability)
  @IsOptional()
  availability?: Availability;
}
