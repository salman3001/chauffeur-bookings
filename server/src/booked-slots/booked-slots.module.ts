import { Module } from '@nestjs/common';
import { BookedSlotsService } from './booked-slots.service';
import { BookedSlotsController } from './booked-slots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookedSlot } from './entities/booked-slot.entity';
import { BookedSlotRepository } from './booked-slot.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookedSlot])],
  controllers: [BookedSlotsController],
  providers: [BookedSlotsService, BookedSlotRepository],
})
export class BookedSlotsModule {}
