import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { KafkaClient } from 'src/core/kafka/kafka-client/kafka-client';
import { Topics } from '../kafka/enums/topics';
import { Groups } from '../kafka/enums/Groups';
import { MailService } from '@salman3001/nest-mailer';
import { EmailMessage } from '../kafka/interfaces/EmailMessage';
import { retryWrapper } from '../utils/retryWrapper';
import { Consumer } from 'kafkajs';

@Injectable()
export class EmailConsumer implements OnModuleInit, OnApplicationShutdown {
  constructor(
    private readonly kafkaClient: KafkaClient,
    private readonly mailservice: MailService,
  ) {}

  consumer: Consumer = this.kafkaClient.kafka.consumer({
    groupId: Groups.EMAIL_CONSUMER,
  });

  async onModuleInit() {
    this.consumer.connect();
    await this.consumer.subscribe({
      topic: Topics.SEND_EMAIL,
      fromBeginning: true,
    });
    await this.consumer.run({
      partitionsConsumedConcurrently: 3,
      eachMessage: async ({ message, topic, heartbeat }) => {
        const payload = message.value;
        if (payload) {
          const payloadObj: EmailMessage = JSON.parse(payload.toString());
          await retryWrapper(
            () => this.mailservice.send(payloadObj),
            topic,
            heartbeat,
          );
        }
      },
    });
  }

  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }
}
