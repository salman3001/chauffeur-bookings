import { ApiProperty } from '@nestjs/swagger';
import { IsIsoDate } from 'src/utils/validators/IsIsoDate';
import { IsIsoDateAfter } from 'src/utils/validators/IsIsoDateAfter';
import { DateTime } from 'luxon';

export class findChauffeurSlotsByDate {
  @ApiProperty()
  @IsIsoDate()
  @IsIsoDateAfter(DateTime.local().startOf('day').toISO())
  date: string;
}
