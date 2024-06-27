import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookedSlot } from './entities/booked-slot.entity';
import { BaseQueryFilter, BaseRepository } from 'src/db/base.repository';
import { ConfigService } from '@nestjs/config';
import { DateTime } from 'luxon';

@Injectable()
export class BookedSlotRepository extends BaseRepository<BookedSlot> {
  constructor(
    @InjectRepository(BookedSlot) repository: Repository<BookedSlot>,
    config: ConfigService,
  ) {
    super(repository, config);
  }

  getAllByMonth(year: number, month: number) {
    const qb = this.createQueryBuilder();
    const startDate = DateTime.local(year, month);
    const endDate = startDate.endOf('month');

    return qb
      .leftJoinAndSelect('BookedSlot.booking', 'booking')
      .select([
        'BookedSlot.id',
        'BookedSlot.dateTimeFrom',
        'BookedSlot.dateTimeTo',
        'booking.id',
      ])
      .where(
        'BookedSlot.dateTimeFrom >= :startDate AND BookedSlot.dateTimeFrom <= :endDate',
        {
          startDate,
          endDate,
        },
      )
      .getMany();
  }

  getAllByMonthForChauffeur(chauffeurId: number, year: number, month: number) {
    const qb = this.createQueryBuilder();
    const startDate = DateTime.local(year, month);
    const endDate = startDate.endOf('month');

    return qb
      .leftJoinAndSelect('BookedSlot.booking', 'booking')
      .leftJoin('BookedSlot.chauffeurProfile', 'chauffeurProfile')
      .leftJoin('chauffeurProfile.user', 'user')
      .select([
        'BookedSlot.id',
        'BookedSlot.dateTimeFrom',
        'BookedSlot.dateTimeTo',
        'booking.id',
        'user.id',
      ])
      .where(
        'BookedSlot.dateTimeFrom >= :startDate AND BookedSlot.dateTimeFrom <= :endDate',
        {
          startDate,
          endDate,
        },
      )
      .andWhere('user.id = :id', {
        id: chauffeurId,
      })
      .getMany();
  }

  getChauffeurBookedSlotsByDate(chauffeurId: number, date: string) {
    const dateToCheck = DateTime.fromISO(date);
    const startOfDate = dateToCheck.startOf('day');
    const endOfDate = dateToCheck.endOf('day');

    return this.createQueryBuilder()
      .leftJoin('BookedSlot.chauffeurProfile', 'chauffeurProfile')
      .where('chauffeurProfile.id = :id', { id: chauffeurId })
      .andWhere(
        'BookedSlot.dateTimeFrom >= :startOfDate AND BookedSlot.dateTimeFrom <= :endOfDate',
        {
          startOfDate,
          endOfDate,
        },
      )
      .getMany();
  }
}

export interface BookedSlotFiler extends BaseQueryFilter {}
