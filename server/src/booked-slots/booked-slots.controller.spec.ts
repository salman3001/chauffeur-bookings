import { Test, TestingModule } from '@nestjs/testing';
import { BookedSlotsController } from './booked-slots.controller';
import { BookedSlotsService } from './booked-slots.service';

describe('BookedSlotsController', () => {
  let controller: BookedSlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookedSlotsController],
      providers: [BookedSlotsService],
    }).compile();

    controller = module.get<BookedSlotsController>(BookedSlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
