import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IUserPolicy } from './user.policy';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';
import { AuthUserType } from 'src/utils/types/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from 'src/utils/enums/userType';
import { UserFilterQuery, UserRepository } from './user.repository';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { ChauffeurProfileRepository } from 'src/chauffeur-profiles/chuffeur-profile.repository';
import { AdminProfileRepository } from 'src/admin-profiles/admin-profile.repository';
import { CheckAvailabiltyDto } from './dto/check-availabilty.dto';
import { DateTime } from 'luxon';

@Injectable()
export class UsersService {
  constructor(
    @Inject('userPolicy') private userPolicy: PolicyService<IUserPolicy>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly chauffeurProfileRepo: ChauffeurProfileRepository,
    private readonly adminProfileRepo: AdminProfileRepository,
  ) {}

  async create(createUserDto: CreateUserDto, authUser: AuthUserType) {
    this.userPolicy.authorize('create', authUser);

    const userExist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
      withDeleted: true,
    });

    if (userExist) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'User Email Already exist',
      });
    }

    return await this.dataSource.transaction(async (manager) => {
      const user = this.userRepository.create(createUserDto);
      const savedUser = await manager.save(user);
      const profile = this.profileRepository.create({});
      profile.user = savedUser;
      await manager.save(profile);

      if (savedUser.userType === UserType.CHAUFFEUR) {
        const chauffeurProfile = this.chauffeurProfileRepo.create({});
        chauffeurProfile.user = savedUser;
        await manager.save(chauffeurProfile);
      }

      if (savedUser.userType === UserType.ADMIN) {
        const adminProfile = this.adminProfileRepo.create({});
        adminProfile.user = savedUser;
        await manager.save(adminProfile);
      }

      return user;
    });
  }

  async findAll(authUser: AuthUserType, query?: UserFilterQuery) {
    this.userPolicy.authorize('findAll', authUser);
    const qb = this.userRepository.createQueryBuilder();
    qb.leftJoinAndSelect('User.profile', 'profile');
    qb.select([
      'User.id',
      'User.firstName',
      'User.lastName',
      'User.email',
      'User.phone',
      'User.userType',
      'User.isActive',
      'profile.avatar',
    ]);
    this.userRepository.applyFilters(qb, query);
    this.userRepository.orderBy(qb, 'User', query);
    return this.userRepository.paginate(qb, query);
  }

  async findOne(id: number, authUser: AuthUserType) {
    this.userPolicy.authorize('find', authUser);
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: {
        profile: true,
        adminProfile: true,
        chauffeurProfile: {
          car: true,
        },
      },
    });
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    authUser: AuthUserType,
  ) {
    const user = await this.userRepository.findOneByOrFail({ id });
    this.userPolicy.authorize('update', authUser);

    if (updateUserDto.email) {
      const emailExist = await this.userRepository.findOne({
        where: { email: updateUserDto.email, id: Not(id) },
        withDeleted: true,
      });
      if (emailExist) {
        throw new CustomHttpException({
          code: 400,
          success: false,
          message: 'User Email Already exist',
        });
      }
    }

    return await this.dataSource.transaction(async (manager) => {
      this.userRepository.merge(user, updateUserDto);
      const savedUser = await manager.save(user);

      if (updateUserDto.userType === UserType.CHAUFFEUR) {
        const chauffeurProfile = this.chauffeurProfileRepo.create({});
        chauffeurProfile.user = savedUser;
        await manager.save(chauffeurProfile);
      }

      if (savedUser.userType === UserType.ADMIN) {
        const adminProfile = this.adminProfileRepo.create({});
        adminProfile.user = savedUser;
        await manager.save(adminProfile);
      }

      return user;
    });
  }

  async remove(id: number, authUser: AuthUserType) {
    const user = await this.userRepository.findOneByOrFail({ id });
    this.userPolicy.authorize('remove', authUser);
    await this.userRepository.softRemove(user);
    return user;
  }

  async getChauffeur(authUser: AuthUserType, query: UserFilterQuery) {
    this.userPolicy.authorize('getChauffeurs', authUser);
    const {
      results: chauffeurs,
      count,
      perPage,
    } = await this.userRepository.getChuffeurs(query);

    return { chauffeurs, count, perPage };
  }

  async getActiveChauffeur(authUser: AuthUserType, query: UserFilterQuery) {
    this.userPolicy.authorize('getActiveChauffeurs', authUser);
    const {
      results: chauffeurs,
      count,
      perPage,
    } = await this.userRepository.getActiveChuffeurs(query);

    return { chauffeurs, count, perPage };
  }

  async checkAvailabilty(
    chauffeurId: number,
    query: CheckAvailabiltyDto,
    authUser: AuthUserType,
  ) {
    this.userPolicy.authorize('checkAvailabilty', authUser);

    const { dateTime, duration } = query;

    if (this.isDurationExceedTomorow(dateTime, duration)) {
      throw new CustomHttpException({
        code: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Max booking hours can not exceed present day',
      });
    }

    const chauffeur = await this.userRepository.checkChauffeurAvailabiltity(
      chauffeurId,
      dateTime,
      duration,
    );

    if (!chauffeur) {
      throw new CustomHttpException({
        code: HttpStatus.BAD_REQUEST,
        success: false,
        message:
          'Chauffeur not available Request date or time. Please change the date or time',
      });
    }

    if (chauffeur.chauffeurProfile?.bookedSlots?.length > 0) {
      throw new CustomHttpException({
        code: HttpStatus.BAD_GATEWAY,
        success: false,
        message:
          'Selected time is overlapping with existing bookings. please review the booked slots and choose the available time',
      });
    }

    return true;
  }

  // async checkAvailabilty2(
  //   chauffeurId: number,
  //   query: CheckAvailabiltyDto,
  //   authUser: AuthUserType,
  // ) {
  //   this.userPolicy.authorize('checkAvailabilty', authUser);

  //   const { dateTime, duration } = query;

  //   if (this.isDurationExceedTomorow(dateTime, duration)) {
  //     throw new CustomHttpException({
  //       code: HttpStatus.BAD_REQUEST,
  //       success: false,
  //       message: 'Max booking hours can not exceed present day',
  //     });
  //   }

  //   const chauffeur = await this.userRepository.findOneOrFail({
  //     where: {
  //       id: chauffeurId,
  //       userType: UserType.CHAUFFEUR,
  //     },
  //     relations: {
  //       chauffeurProfile: true,
  //     },
  //   });

  //   const isChauffeurAvailableOnRequestedDateTime =
  //     this.isChauffeurAvailableOnRequestedDateTime(
  //       chauffeur,
  //       dateTime,
  //       duration,
  //     );

  //   if (!isChauffeurAvailableOnRequestedDateTime) {
  //     throw new CustomHttpException({
  //       code: HttpStatus.BAD_REQUEST,
  //       success: false,
  //       message:
  //         'Chauffeur not available Request date or time. Please change the date or time',
  //     });
  //   }

  //   const bookedSlots = await this.bookedSlotRepo.getChauffeurBookedSlotsByDate(
  //     chauffeur.chauffeurProfile.id,
  //     dateTime,
  //   );

  //   const isRequestedTimeBookedOrOverlapping =
  //     this.isRequestedTimeBookedOrOverlapping(dateTime, duration, bookedSlots);

  //   if (isRequestedTimeBookedOrOverlapping) {
  //     throw new CustomHttpException({
  //       code: HttpStatus.BAD_GATEWAY,
  //       success: false,
  //       message:
  //         'Selected time is overlapping with existing bookings. please review the booked slots and choose the available time',
  //     });
  //   }

  //   return true;
  // }

  async getAvailableChauffeurs(query: CheckAvailabiltyDto) {
    this.userPolicy.authorize('getAvailableChauffeurs');

    const { dateTime, duration } = query;

    if (this.isDurationExceedTomorow(dateTime, duration)) {
      throw new CustomHttpException({
        code: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Max booking hours can not exceed present day',
      });
    }

    const chauffeurs = await this.userRepository.getAvailableChauffeurs(
      dateTime,
      duration,
    );

    const filteredChauffeurs = chauffeurs.filter((c) => {
      if (c?.chauffeurProfile) {
        const isBookedSlotsThere =
          c.chauffeurProfile?.bookedSlots &&
          c.chauffeurProfile?.bookedSlots?.length > 0;
        return !isBookedSlotsThere;
      }
      return true;
      return c.chauffeurProfile?.bookedSlots?.length === 0;
    });

    return filteredChauffeurs;
  }

  async getCustomer(authUser: AuthUserType, query: UserFilterQuery) {
    this.userPolicy.authorize('getCustomer', authUser);
    const {
      results: customers,
      count,
      perPage,
    } = await this.userRepository.getCustomer(query);

    return { customers, count, perPage };
  }

  // private isChauffeurAvailableOnRequestedDateTime(
  //   chauffeur: User,
  //   dateTime: string,
  //   duration: number,
  // ) {
  //   const requestedDateTimeForm = DateTime.fromISO(dateTime);
  //   const requestedDateTimeTo = DateTime.fromISO(dateTime).plus({
  //     hour: duration,
  //   });

  //   const requestedDay = requestedDateTimeForm.weekday;
  //   const requestedWeekDay = weekDays[requestedDay] as 'sunday';

  //   const isChauffeurAvailableOnThisDay =
  //     chauffeur.chauffeurProfile?.availability[requestedWeekDay]?.available;

  //   const isChauffeurAvailableFullDay =
  //     chauffeur.chauffeurProfile?.availability[requestedWeekDay]?.fullDay;

  //   const chauffeurAvailableFrom =
  //     chauffeur.chauffeurProfile?.availability[requestedWeekDay]?.from;
  //   const chauffeurAvailableTo =
  //     chauffeur.chauffeurProfile?.availability[requestedWeekDay]?.to;

  //   let isWithinRange = false;

  //   if (chauffeurAvailableFrom && chauffeurAvailableTo) {
  //     const chauffeurAvailableFromDateTime = requestedDateTimeForm.set({
  //       hour: Number(chauffeurAvailableFrom.split(':')[0]),
  //       minute: Number(chauffeurAvailableFrom.split(':')[1]),
  //     });

  //     const chauffeurAvailableToDateTime = requestedDateTimeForm.set({
  //       hour: Number(chauffeurAvailableTo.split(':')[0]),
  //       minute: Number(chauffeurAvailableTo.split(':')[1]),
  //     });

  //     if (
  //       requestedDateTimeForm >= chauffeurAvailableFromDateTime &&
  //       requestedDateTimeTo <= chauffeurAvailableToDateTime
  //     ) {
  //       isWithinRange = true;
  //     }
  //   }

  //   if (isChauffeurAvailableOnThisDay && isChauffeurAvailableFullDay) {
  //     return true;
  //   } else if (isChauffeurAvailableOnThisDay && isWithinRange) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // private isRequestedTimeBookedOrOverlapping(
  //   dateTime: string,
  //   duration: number,
  //   bookedSlots: BookedSlot[],
  // ) {
  //   const requestedDateTimeForm = DateTime.fromISO(dateTime);
  //   const requestedDateTimeTo = DateTime.fromISO(dateTime).plus({
  //     hour: duration,
  //   });

  //   let isBookedOrOverlapping = false;

  //   bookedSlots.forEach((slot) => {
  //     const slotDateTimeFrom = DateTime.fromJSDate(slot.dateTimeFrom);

  //     const slotDateTimeTo = DateTime.fromJSDate(slot.dateTimeTo);

  //     const isRequestedFromTimeOverLap =
  //       requestedDateTimeForm >= slotDateTimeFrom &&
  //       requestedDateTimeForm <= slotDateTimeTo;

  //     const isRequestedToTimeOverLap =
  //       requestedDateTimeTo >= slotDateTimeFrom &&
  //       requestedDateTimeTo <= slotDateTimeTo;

  //     const isTimeSlotInBetween =
  //       requestedDateTimeForm <= slotDateTimeFrom &&
  //       requestedDateTimeTo >= slotDateTimeTo;

  //     if (
  //       isRequestedFromTimeOverLap ||
  //       isRequestedToTimeOverLap ||
  //       isTimeSlotInBetween
  //     ) {
  //       isBookedOrOverlapping = true;
  //     }
  //   });

  //   return isBookedOrOverlapping;
  // }

  isDurationExceedTomorow(dateTime: string, duration: number) {
    const requestedDateTime = DateTime.fromISO(dateTime);
    const endDayDateTime = requestedDateTime.endOf('day');
    const diff = endDayDateTime.diff(requestedDateTime, 'hour');
    return duration > diff.hours;
  }

  isTImeAfter30Minutes(dateTime: string, duration) {
    const requestedDateTime = DateTime.fromISO(dateTime);
    const endDayDateTime = requestedDateTime.endOf('day');
    const diff = endDayDateTime.diff(requestedDateTime, 'hour');
    return duration > diff.hours;
  }
}
