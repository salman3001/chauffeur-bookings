import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { BookingsPolicy } from './booking.policy';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { Booking } from './entities/booking.entity';
import { BookingRepository } from './booking.repository';
import { UserRepository } from 'src/users/user.repository';
import { UsersService } from 'src/users/users.service';
import { BookedSlotRepository } from 'src/booked-slots/booked-slot.repository';
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Booking, BookedSlot]),
    PolicyModule.register([
      { token: 'BookingsPolicy', policy: BookingsPolicy },
    ]),
  ],
  controllers: [BookingsController],
  providers: [
    BookingRepository,
    BookedSlotRepository,
    UserRepository,
    UsersService,
    BookingsService,
  ],
})
export class BookingsModule {}
