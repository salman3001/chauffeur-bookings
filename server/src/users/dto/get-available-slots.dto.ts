import { IsDate, MaxDate, MinDate } from 'class-validator';

export class GetAvailableSlotsDto {
  @IsDate()
  @MinDate(new Date())
  @MaxDate(() => {
    const maxDate = new Date();
    maxDate.setDate(new Date().getDate() + 30);
    return maxDate;
  })
  date: Date;
}
