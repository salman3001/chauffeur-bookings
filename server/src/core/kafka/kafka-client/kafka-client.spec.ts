import { Test, TestingModule } from '@nestjs/testing';
import { KafkaClient } from './kafka-client';

describe('KafkaClient', () => {
  let service: KafkaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkaClient],
    }).compile();

    service = module.get<KafkaClient>(KafkaClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
