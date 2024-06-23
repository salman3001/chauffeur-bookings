import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { Topics } from '../enums/topics';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaClient implements OnModuleInit, OnApplicationShutdown {
  constructor(private readonly config: ConfigService) {}

  kafka = new Kafka(this.config.get('kafkaConfig')!);

  private readonly admin = this.kafka.admin();
  async onModuleInit() {
    await this.admin.connect();
    const existingTopics = await this.admin.listTopics();

    const topicsToCreate = Object.values(Topics).filter(
      (topic) => !existingTopics.includes(topic),
    );

    if (topicsToCreate.length > 0) {
      await this.admin.createTopics({
        waitForLeaders: true,
        topics: topicsToCreate.map((topic) => ({
          topic,
          numPartitions: 1, // Adjust as necessary
          replicationFactor: 1, // Adjust as necessary
          configEntries: [{ name: 'retention.ms', value: '604800000' }], // messages kept for 7 days
        })),
      });
      console.log(`Created missing topics: ${topicsToCreate.join(', ')}`);
    } else {
      console.log('All topics already exist.');
    }
  }
  async onApplicationShutdown() {
    await this.admin.disconnect();
  }
}
