import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ProducerRecord } from 'kafkajs';
import { KafkaClient } from '../kafka-client/kafka-client';
import { Transaction } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  constructor(private readonly kafkaClient: KafkaClient) {}

  private readonly producer = this.kafkaClient.kafka.producer();

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  transaction(): Promise<Transaction> {
    return this.producer.transaction();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
