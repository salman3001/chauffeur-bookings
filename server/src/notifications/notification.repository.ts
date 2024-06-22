import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/cars/entities/base.repository';
import { ConfigService } from '@salman3001/nest-config-module';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationRepository extends BaseRepository<Notification> {
  constructor(
    @InjectRepository(Notification)
    repository: Repository<Notification>,
    config: ConfigService,
  ) {
    super(repository, config);
  }
}
