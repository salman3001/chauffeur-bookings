import { PickType } from '@nestjs/swagger';
import { Booking } from '../entities/booking.entity';
import { IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  @IsDateString()
  pickupDate: string;

  @ApiProperty()
  @IsDateString()
  pickupTime: string;
}
