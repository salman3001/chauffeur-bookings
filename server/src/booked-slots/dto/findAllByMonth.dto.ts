import { IsNumber, Max, Min } from 'class-validator';

export class findAllByMonthDto {
  @IsNumber()
  @Min(2000)
  @Max(3000)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(11)
  month: number;
}
