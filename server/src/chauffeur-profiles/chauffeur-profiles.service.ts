import { Inject, Injectable } from '@nestjs/common';
import { UpdateChauffeurProfileDto } from './dto/update-chauffeur-profile.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IChauffeurProfilesPolicy } from './chauffeur-profiles.policy';
import { AuthUserType } from 'src/core/utils/types/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ChauffeurProfile } from './entities/chauffeur-profile.entity';
import User from 'src/users/entities/user.entity';
import { UserType } from 'src/core/utils/enums/userType';
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';
import { weekDays } from 'src/core/utils/helpers';
import { Availability } from './fixtures/availability';
import { CustomHttpException } from 'src/core/utils/Exceptions/CustomHttpException';

@Injectable()
export class ChauffeurProfilesService {
  constructor(
    @Inject('ChauffeurProfilesPolicy')
    private readonly chauffeurProfilesPolicy: PolicyService<IChauffeurProfilesPolicy>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async findOne(authUser: AuthUserType) {
    const chauffeurProfile = await this.dataSource.manager.findOneOrFail(
      ChauffeurProfile,
      { where: { id: authUser?.id }, relations: { user: true } },
    );

    this.chauffeurProfilesPolicy.authorize('find', authUser, chauffeurProfile);
    return chauffeurProfile;
  }

  async update(
    updateChauffeurProfileDto: UpdateChauffeurProfileDto,
    authUser: AuthUserType,
  ) {
    const chauffeurProfile = await this.dataSource.manager.findOneOrFail(
      ChauffeurProfile,
      { where: { id: authUser?.id }, relations: { user: true } },
    );

    this.chauffeurProfilesPolicy.authorize(
      'update',
      authUser,
      chauffeurProfile,
    );

    const { availability, ...restPayload } = updateChauffeurProfileDto;

    Object.assign(chauffeurProfile, restPayload);

    if (availability) {
      chauffeurProfile.availability = availability;
    }

    await this.dataSource.manager.save(ChauffeurProfile, chauffeurProfile);
    return chauffeurProfile;
  }

  async getAvailableSlots(
    chauffeurId: number,
    date: Date,
    authUser: AuthUserType,
  ) {
    this.chauffeurProfilesPolicy.authorize('availableSlots', authUser);

    const chauffeur = await this.dataSource.manager.findOneOrFail(User, {
      where: { id: chauffeurId, userType: UserType.CHAUFFEUR },
      relations: { chauffeurProfile: true },
    });

    const dateToCheck = new Date(date);
    dateToCheck.setUTCHours(0, 0, 0, 0);

    const bookedSlots = await this.dataSource
      .createQueryBuilder(BookedSlot, 'booked_slot')
      .where('booked_slot.date = :dateToCheck', {
        dateToCheck: dateToCheck.toISOString().split('T')[0],
      })
      .getMany();

    const dayToCheck = dateToCheck.getDay();

    const availableSlots = chauffeur.chauffeurProfile.availability[
      weekDays[dayToCheck] as 'sunday'
    ].filter((slot) => {
      const isBookedSlotExist = bookedSlots.filter(
        (bs) => bs.slotName === slot.name,
      );

      if (isBookedSlotExist.length > 0) {
        return false;
      }
      return true;
    });

    return availableSlots;
  }

  async isSlotValidForBooking(
    chauffeurId: number,
    slot: Availability['friday'][0],
    date: Date,
    authUser: AuthUserType,
  ): Promise<boolean> {
    const availableSlots = await this.getAvailableSlots(
      chauffeurId,
      date,
      authUser,
    );

    const validSlot = availableSlots.filter((s) => {
      s.name === slot.name;
    });

    if (validSlot.length === 0) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'Invalid booking slot provided',
      });
    }
    return true;
  }
}
