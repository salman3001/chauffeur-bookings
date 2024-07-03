import { Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { BaseQueryFilter, BaseRepository } from 'src/db/base.repository';
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
  async getUserNotifications(userId: number, query: NotificationFilterQuery) {
    const qb = this.createQueryBuilder();
    qb.leftJoin('Notification.user', 'user');
    qb.where('user.id = :id', { id: userId });
    qb.orderBy('Notification.createdAt', 'DESC');
    this.applyFilters(qb, query);
    return this.paginate(qb, query);
  }

  async getMenuNotifications(userId: number) {
    const qb = this.createQueryBuilder();
    qb.leftJoin('Notification.user', 'user');
    qb.where('user.id = :id', { id: userId });
    qb.orderBy('Notification.createdAt', 'DESC');
    qb.take(10);
    const notifications = await qb.getMany();
    const count = await qb.getCount();
    return { notifications, count };
  }

  async removeOneForUser(id: number, userId: number) {
    const qb = this.createQueryBuilder();
    return qb
      .leftJoin('Notification.user', 'user')
      .where('Notification.id = :id', { id })
      .andWhere('user.id = :id', { id: userId })
      .delete()
      .execute();
  }

  async removeReadForUser(userId: number) {
    const qb = this.createQueryBuilder();
    return qb
      .leftJoin('Notification.user', 'user')
      .where('user.id = :id', { id: userId })
      .andWhere('Notification."readAt" IS NOT NULL')
      .delete()
      .execute();
  }

  async removeAllForUser(userId: number) {
    const qb = this.createQueryBuilder();
    return qb
      .leftJoin('Notification.user', 'user')
      .where('user.id = :id', { id: userId })
      .delete()
      .execute();
  }

  async markAsRead(id: number, userId: number) {
    const qb = this.createQueryBuilder();
    return qb
      .leftJoin('Notification.user', 'user')
      .where('Notification.id = :id', { id })
      .where('user.id = :id', { id: userId })
      .update({ readAt: new Date() })
      .execute();
  }

  async markAsUnRead(id: number, userId: number) {
    const qb = this.createQueryBuilder();
    return qb
      .leftJoin('Notification.user', 'user')
      .where('Notification.id = :id', { id })
      .where('user.id = :id', { id: userId })
      .update({ readAt: null })
      .execute();
  }

  applyFilters(
    qb: SelectQueryBuilder<Notification>,
    query: NotificationFilterQuery,
  ) {
    if (query?.type) {
      if (query.type === 'read') {
        qb.andWhere('Notification."readAt" IS NOT NULL');
      }

      if (query.type === 'unread') {
        qb.andWhere('Notification."readAt" IS NULL');
      }
    }
  }
}

export interface NotificationFilterQuery extends BaseQueryFilter {
  type: 'read' | 'unread';
}
