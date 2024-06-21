import { Inject, Injectable } from '@nestjs/common';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IBookedSlotsPolicy } from './booked-slots.policy';
import { AuthUserType } from 'src/core/utils/types/common';
import { BookedSlotRepository } from './booked-slot.repository';
import { findAllByMonthDto } from './dto/findAllByMonth.dto';

@Injectable()
export class BookedSlotsService {
  constructor(
    @Inject('BookedSlotsPolicy')
    private readonly bookedSlotsPolicy: PolicyService<IBookedSlotsPolicy>,
    private bookedSlotRepo: BookedSlotRepository,
  ) {}

  async findAllByMonth(dto: findAllByMonthDto, user: AuthUserType) {
    this.bookedSlotsPolicy.authorize('findAllByMonth', user);
    const bookedSlots = await this.bookedSlotRepo.getAllByMonth(
      dto.year,
      dto.month,
    );
    return bookedSlots;
  }

  async findAllForChauffeurByMonth(
    chauffeurId: number,
    dto: findAllByMonthDto,
    user: AuthUserType,
  ) {
    this.bookedSlotsPolicy.authorize(
      'findAllByMonthForChauffeur',
      user,
      chauffeurId,
    );

    const bookedSlots = await this.bookedSlotRepo.getAllByMonthForChauffeur(
      chauffeurId,
      dto.year,
      dto.month,
    );
    return bookedSlots;
  }

  async findChauffeurBookedSlotsByDate(
    chauffeurId: number,
    date: string,
    user: AuthUserType,
  ) {
    this.bookedSlotsPolicy.authorize('findChauffeurBookedSlotsByDate', user);
    const requestedDate = new Date(date);
    const slots = await this.bookedSlotRepo.getChauffeurBookedSlotsByDate(
      chauffeurId,
      requestedDate,
    );

    return slots;
  }
}
