import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsISO8601, IsNumber } from 'class-validator';
import { IsTimeString } from 'src/utils/validators/IsTimeString';

export class CheckAvailabiltyDto {
  @ApiProperty()
  @IsISO8601()
  date: string;

  @ApiProperty()
  @IsTimeString()
  time: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  duration: number;
}
