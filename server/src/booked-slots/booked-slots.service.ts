import { Injectable } from '@nestjs/common';
import { CreateBookedSlotDto } from './dto/create-booked-slot.dto';
import { UpdateBookedSlotDto } from './dto/update-booked-slot.dto';

@Injectable()
export class BookedSlotsService {
  create(createBookedSlotDto: CreateBookedSlotDto) {
    return 'This action adds a new bookedSlot';
  }

  findAll() {
    return `This action returns all bookedSlots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookedSlot`;
  }

  update(id: number, updateBookedSlotDto: UpdateBookedSlotDto) {
    return `This action updates a #${id} bookedSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookedSlot`;
  }
}
