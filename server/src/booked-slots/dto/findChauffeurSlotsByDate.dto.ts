import { IsISO8601 } from 'class-validator';
import { IsIsoAfter } from 'src/utils/validators/IsIsoAfter';

export class findChauffeurSlotsByDate {
  @IsISO8601()
  @IsIsoAfter(new Date())
  date: number;
}
