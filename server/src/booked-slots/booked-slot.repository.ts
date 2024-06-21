import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookedSlot } from './entities/booked-slot.entity';
import {
  BaseQueryFilter,
  BaseRepository,
} from 'src/cars/entities/base.repository';
import { ConfigService } from '@salman3001/nest-config-module';
import { UserType } from 'src/core/utils/enums/userType';
import { endOfMonth, startOfMonth } from 'date-fns';

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
    const requestDate = new Date(year, month);

    return qb
      .leftJoinAndSelect('bookingSlot.booking', 'booking')
      .where(
        'bookingSlot.dateTimeFrom >= :startDate AND bookingSlot.dateTimeFrom <= :endDate',
        {
          starDate: startOfMonth(requestDate),
          endDate: endOfMonth(requestDate),
        },
      )
      .getMany();
  }

  getAllByMonthForChauffeur(chauffeurId: number, year: number, month: number) {
    const qb = this.createQueryBuilder();
    const requestDate = new Date(year, month);

    return qb
      .leftJoinAndSelect('bookingSlot.booking', 'booking')
      .leftJoin('bookingSlot.chauffeurProfile', 'chauffeurProfile')
      .leftJoin('chauffeurProfile.user', 'user')
      .where(
        'bookingSlot.dateTimeFrom >= :startDate AND bookingSlot.dateTimeFrom <= :endDate',
        {
          starDate: startOfMonth(requestDate),
          endDate: endOfMonth(requestDate),
        },
      )
      .andWhere('user.id = :id', {
        id: chauffeurId,
      })
      .getMany();
  }

  getChauffeurBookedSlotsByDate(chauffeurId: number, date: Date) {
    const dateToCheck = new Date(date);
    return this.createQueryBuilder()
      .leftJoin('booked_slots.chauffeurProfile', 'chauffeurProfile')
      .where('chauffeurProfile.id = :id', { id: chauffeurId })
      .andWhere('bookedSlots.date = :dateToCheck', {
        dateToCheck: dateToCheck,
      })
      .getMany();
  }
}

export interface BookedSlotFiler extends BaseQueryFilter {}
