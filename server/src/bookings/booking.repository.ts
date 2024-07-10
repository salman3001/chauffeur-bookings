import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BaseQueryFilter, BaseRepository } from 'src/db/base.repository';
import { ConfigService } from '@nestjs/config';

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
      .leftJoinAndSelect('Booking.customerProfile', 'customerProfile')
      .leftJoinAndSelect('Booking.chauffeurProfile', 'chauffeurProfile')
      .leftJoinAndSelect('chauffeurProfile.user', 'chauffeur')
      .leftJoinAndSelect('customerProfile.user', 'customer')
      .where('chauffeur.id = :id', { id: chauffeurId });

    return this.paginate(qb, query);
  }

  async getCustomersBookings(customerId: number, query?: BookingFilterQuery) {
    const qb = this.createQueryBuilder()
      .leftJoinAndSelect('Booking.customerProfile', 'customerProfile')
      .leftJoinAndSelect('Booking.chauffeurProfile', 'chauffeurProfile')
      .leftJoinAndSelect('chauffeurProfile.user', 'chauffeur')
      .leftJoinAndSelect('customerProfile.user', 'customer')
      .where('customer.id = :id', { id: customerId });

    return this.paginate(qb, query);
  }

  async getAdminBookings(query?: BookingFilterQuery) {
    const qb = this.createQueryBuilder()
      .leftJoinAndSelect('Booking.customerProfile', 'customerProfile')
      .leftJoinAndSelect('Booking.chauffeurProfile', 'chauffeurProfile')
      .leftJoinAndSelect('chauffeurProfile.user', 'chauffeur')
      .leftJoinAndSelect('customerProfile.user', 'customer');

    return this.paginate(qb, query);
  }
}

export interface BookingFilterQuery extends BaseQueryFilter {}
