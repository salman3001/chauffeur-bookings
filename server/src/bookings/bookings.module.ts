import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { BookingsPolicy } from './booking.policy';

@Module({
  imports: [
    PolicyModule.register([
      { token: 'BookingsPolicy', policy: BookingsPolicy },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
