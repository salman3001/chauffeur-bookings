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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Booking]),
    PolicyModule.register([
      { token: 'BookingsPolicy', policy: BookingsPolicy },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingRepository, UserRepository],
})
export class BookingsModule {}
