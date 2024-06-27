import { PickType } from '@nestjs/swagger';
import { Booking } from '../entities/booking.entity';
import { IsISO8601, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsIsoAfter } from 'src/utils/validators/IsIsoAfter';
import { DateTime } from 'luxon';

export class CreateBookingDto extends PickType(Booking, [
  'pickupAddress',
  'pickupCords',
  'dropoffAddress',
  'dropoffCords',
  'bookedForHours',
  'paymentMode',
]) {
  @ApiProperty()
  @IsNumber()
  chauffeurId: number;

  @ApiProperty({ description: 'send iso datetime eg. 2024-06-24T08:00' })
  @IsISO8601()
  @IsIsoAfter(DateTime.local().plus({ minutes: 15 }).toISO())
  pickupDateTime: string;
}
