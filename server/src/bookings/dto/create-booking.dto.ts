import { PickType } from '@nestjs/mapped-types';
import { Booking } from '../entities/booking.entity';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Slot } from 'src/chauffeur-profiles/dto/update-chauffeur-profile.dto';
import { Type } from 'class-transformer';

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

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Slot)
  slots: Slot[];
}
