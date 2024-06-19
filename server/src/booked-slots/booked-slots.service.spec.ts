import { Test, TestingModule } from '@nestjs/testing';
import { BookedSlotsService } from './booked-slots.service';

describe('BookedSlotsService', () => {
  let service: BookedSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookedSlotsService],
    }).compile();

    service = module.get<BookedSlotsService>(BookedSlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
