import { PickType } from '@nestjs/mapped-types';
import { Booking } from '../entities/booking.entity';
import { IsDateString, IsNumber } from 'class-validator';

export class CreateBookingDto extends PickType(Booking, [
  'pickupAddress',
  'pickupCords',
  'dropoffAddress',
  'dropoffCords',
  'bookedForHours',
  'paymentMode',
]) {
  @IsNumber()
  chauffeurId: number;

  @IsDateString()
  pickupDate: string;

  @IsDateString()
  pickupTime: string;
}
