import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class findAllByMonthDto {
  @ApiProperty()
  @IsNumber()
  @Min(2000)
  @Max(3000)
  @Type(() => Number)
  year: number;

  @ApiProperty({
    description: 'The months should be from 0 to 11, where 0 is january',
  })
  @IsNumber()
  @Min(0)
  @Max(11)
  @Type(() => Number)
  month: number;
}
