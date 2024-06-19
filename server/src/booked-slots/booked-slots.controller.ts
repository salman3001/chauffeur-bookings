import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookedSlotsService } from './booked-slots.service';
import { CreateBookedSlotDto } from './dto/create-booked-slot.dto';
import { UpdateBookedSlotDto } from './dto/update-booked-slot.dto';

@Controller('booked-slots')
export class BookedSlotsController {
  constructor(private readonly bookedSlotsService: BookedSlotsService) {}

  @Post()
  create(@Body() createBookedSlotDto: CreateBookedSlotDto) {
    return this.bookedSlotsService.create(createBookedSlotDto);
  }

  @Get()
  findAll() {
    return this.bookedSlotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookedSlotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookedSlotDto: UpdateBookedSlotDto) {
    return this.bookedSlotsService.update(+id, updateBookedSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookedSlotsService.remove(+id);
  }
}
