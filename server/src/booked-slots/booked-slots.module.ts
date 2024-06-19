import { Module } from '@nestjs/common';
import { BookedSlotsService } from './booked-slots.service';
import { BookedSlotsController } from './booked-slots.controller';

@Module({
  controllers: [BookedSlotsController],
  providers: [BookedSlotsService],
})
export class BookedSlotsModule {}
