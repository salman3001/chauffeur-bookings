import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@salman3001/nest-config-module';
import { Kafka, logLevel } from 'kafkajs';
import { Config } from 'src/core/config/config';
import { Topics } from '../enums/topics';

@Injectable()
export class KafkaClient implements OnModuleInit, OnApplicationShutdown {
  constructor(private readonly config: ConfigService) {}

  kafka = new Kafka({
    brokers: [this.config.get<Config>().envs().KAFKA_BROKER],
    clientId: 'kafka-server-1',
    logLevel: logLevel.ERROR,
  });

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
