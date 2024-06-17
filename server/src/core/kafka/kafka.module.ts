import { Global, Module } from '@nestjs/common';
import { ProducerService } from './producer/producer.service';
import { KafkaClient } from './kafka-client/kafka-client';

@Global()
@Module({
  providers: [ProducerService, KafkaClient],
  exports: [ProducerService, KafkaClient],
})
export class KafkaModule {}
