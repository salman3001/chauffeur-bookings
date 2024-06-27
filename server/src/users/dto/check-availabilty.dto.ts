import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsDateString } from 'class-validator';
import { DateTime } from 'luxon';
import { IsIsoAfter } from 'src/utils/validators/IsIsoAfter';

export class CheckAvailabiltyDto {
  @ApiProperty()
  @IsDateString({ strictSeparator: true, strict: true })
  @IsIsoAfter(DateTime.local().toISO())
  dateTime: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  duration: number;
}
