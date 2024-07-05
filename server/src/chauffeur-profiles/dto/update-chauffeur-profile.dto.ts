import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Availability } from '../availability/entities/availability.entity';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// export class AvailabilityByDay {
//   @ApiProperty({ default: false })
//   @IsNotEmpty()
//   @IsBoolean()
//   available: boolean;

//   @ApiProperty({ default: false })
//   @IsNotEmpty()
//   @IsBoolean()
//   fullDay: boolean;

//   @ApiProperty({ default: null, type: String })
//   @ValidateIf((o) => {
//     if (o.available === true && o.fullDay === false) {
//       return true;
//     } else {
//       return false;
//     }
//   })
//   @IsTimeString()
//   from: string | null;

//   @ApiProperty({ default: null, type: String })
//   @ValidateIf((o) => {
//     if (o.available === true && o.fullDay === false) {
//       return true;
//     } else {
//       return false;
//     }
//   })
//   @IsTimeString()
//   @isTimeStringAfterField('from')
//   to: string | null;
// }

// class Availability {
//   @ApiProperty()
//   @ValidateNested()
//   @IsNotEmpty()
//   @Type(() => AvailabilityByDay)
//   sunday: AvailabilityByDay;

//   @ApiProperty()
//   @ValidateNested()
//   @IsNotEmpty()
//   @Type(() => AvailabilityByDay)
//   monday: AvailabilityByDay;

//   @ApiProperty()
//   @ValidateNested()
//   @IsNotEmpty()
//   @Type(() => AvailabilityByDay)
//   tuesday: AvailabilityByDay;

//   @ApiProperty()
//   @ValidateNested()
//   @IsNotEmpty()
//   @Type(() => AvailabilityByDay)
//   wednesday: AvailabilityByDay;

//   @ApiProperty()
//   @ValidateNested()
//   @IsNotEmpty()
//   @Type(() => AvailabilityByDay)
//   thursday: AvailabilityByDay;

//   @ApiProperty()
//   @ValidateNested()
//   @IsNotEmpty()
//   @Type(() => AvailabilityByDay)
//   friday: AvailabilityByDay;

//   @ApiProperty()
//   @ValidateNested()
//   @IsNotEmpty()
//   @Type(() => AvailabilityByDay)
//   saturday: AvailabilityByDay;
// }

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
  @Type(() => Availability)
  @IsOptional()
  availability?: Availability;
}
