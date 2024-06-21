import { Module } from '@nestjs/common';
import { BookedSlotsService } from './booked-slots.service';
import { BookedSlotsController } from './booked-slots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookedSlot } from './entities/booked-slot.entity';
import { BookedSlotRepository } from './booked-slot.repository';
import { PolicyModule } from '@salman3001/nest-policy-module';
import { BookedSlotsPolicy } from './booked-slots.policy';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookedSlot]),
    PolicyModule.register([
      {
        token: 'BookedSlotsPolicy',
        policy: BookedSlotsPolicy,
      },
    ]),
  ],
  controllers: [BookedSlotsController],
  providers: [BookedSlotsService, BookedSlotRepository],
})
export class BookedSlotsModule {}
