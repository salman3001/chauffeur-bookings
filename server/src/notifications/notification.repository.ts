import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@salman3001/nest-config-module';
import { Notification } from './entities/notification.entity';
import { BaseRepository } from 'src/core/db/base.repository';

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
