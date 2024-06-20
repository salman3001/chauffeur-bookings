import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookedSlot } from './entities/booked-slot.entity';
import { BaseRepository } from 'src/cars/entities/base.repository';
import { ConfigService } from '@salman3001/nest-config-module';

@Injectable()
export class BookedSlotRepository extends BaseRepository<BookedSlot> {
  constructor(
    @InjectRepository(BookedSlot) repository: Repository<BookedSlot>,
    config: ConfigService,
  ) {
    super(repository, config);
  }

  getChauffeurBookedSlotsByDate(chauffeurId: number, date: Date) {
    const dateToCheck = new Date(date);
    dateToCheck.setUTCHours(0, 0, 0, 0);
    return this.createQueryBuilder()
      .leftJoin('booked_slots.chauffeurProfile', 'chauffeurProfile')
      .where('chauffeurProfile.id = :id', { id: chauffeurId })
      .andWhere('booked_slots.date = :dateToCheck', {
        dateToCheck: dateToCheck.toISOString().split('T')[0],
      })
      .getMany();
  }
}
