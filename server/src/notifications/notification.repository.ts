import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { BaseRepository } from 'src/db/base.repository';
import { ConfigService } from '@nestjs/config';

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
