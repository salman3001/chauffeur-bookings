import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { ConfigService } from '@salman3001/nest-config-module';
import {
  BaseQueryFilter,
  BaseRepository,
} from 'src/cars/entities/base.repository';

@Injectable()
export class BookingRepository extends BaseRepository<Booking> {
  constructor(
    @InjectRepository(Booking) repository: Repository<Booking>,
    config: ConfigService,
  ) {
    super(repository, config);
  }

  async getchauffeurBookings(chauffeurId: number, query?: BookingFilterQuery) {
    const qb = this.createQueryBuilder()
      .leftJoin('user.chauffeurProfile', 'chauffeurProfile')
      .leftJoin('chauffeurProfile.user', 'user')
      .where('user.id = id', { id: chauffeurId });

    return this.paginate(qb, query);
  }

  async getCustomersBookings(customerId: number, query?: BookingFilterQuery) {
    const qb = this.createQueryBuilder()
      .leftJoin('user.customerProfile', 'customerProfile')
      .leftJoin('customerProfile.user', 'user')
      .where('user.id = id', { id: customerId });

    return this.paginate(qb, query);
  }

  async getAdminBookings(query?: BookingFilterQuery) {
    const qb = this.createQueryBuilder();

    return this.paginate(qb, query);
  }
}

export interface BookingFilterQuery extends BaseQueryFilter {}
