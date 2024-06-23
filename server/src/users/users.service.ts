import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource, ILike, Not } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IUserPolicy } from './user.policy';
import { CustomHttpException } from 'src/core/utils/Exceptions/CustomHttpException';
import { AuthUserType } from 'src/core/utils/types/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from 'src/core/utils/enums/userType';
import { UserFilterQuery, UserRepository } from './user.repository';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { ChauffeurProfileRepository } from 'src/chauffeur-profiles/chuffeur-profile.repository';
import { AdminProfileRepository } from 'src/admin-profiles/admin-profile.repository';
import { weekDays } from 'src/core/utils/helpers';
import { BookedSlotRepository } from 'src/booked-slots/booked-slot.repository';
import { CheckAvailabiltyDto } from './dto/check-availabilty.dto';
import User from './entities/user.entity';
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';
import { add, parse } from 'date-fns';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/core/config/app.config';

@Injectable()
export class UsersService {
  constructor(
    private readonly config: ConfigService,
    @Inject('userPolicy') private userPolicy: PolicyService<IUserPolicy>,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly chauffeurProfileRepo: ChauffeurProfileRepository,
    private readonly adminProfileRepo: AdminProfileRepository,
    private readonly bookedSlotRepo: BookedSlotRepository,
  ) {}

  async create(createUserDto: CreateUserDto, authUser: AuthUserType) {
    this.userPolicy.authorize('create', authUser);

    const userExist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
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

  async findAll(
    authUser: AuthUserType,
    query?: {
      page?: number;
      perPage?: number;
      search?: string;
      orderBy?: string;
    },
  ) {
    this.userPolicy.authorize('findAll', authUser);
    const take =
      query?.perPage || this.config.get<AppConfig>('appConfig')!.defaultPerPage;
    const skip = ((query?.page || 1) - 1) * take;

    const [orderBy, orderDirection] = query?.orderBy
      ? query?.orderBy.split(':')
      : [];

    const [users, count] = await this.userRepository.findAndCount({
      where: query?.search
        ? {
            firstName: ILike(`%${query.search}%`),
            lastName: ILike(`%${query.search}%`),
          }
        : {},
      order: orderBy ? { [orderBy]: orderDirection } : {},
      skip,
      take,
    });

    return { users, count, perPage: take };
  }

  async findOne(id: number, authUser: AuthUserType) {
    this.userPolicy.authorize('find', authUser);
    const user = await this.userRepository.findOneByOrFail({ id });
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    authUser: AuthUserType,
  ) {
    const user = await this.userRepository.findOneByOrFail({ id });
    this.userPolicy.authorize('update', authUser);

    const emailExist = await this.userRepository.findOne({
      where: { email: updateUserDto.email, id: Not(id) },
    });

    if (emailExist) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'User Email Already exist',
      });
    }
    this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
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

  async checkAvailabilty(dto: CheckAvailabiltyDto, authUser: AuthUserType) {
    this.userPolicy.authorize('checkAvailabilty', authUser);

    const { chauffeurId, date, time, duration } = dto;

    const chauffeur = await this.userRepository.findOneOrFail({
      where: {
        id: chauffeurId,
        userType: UserType.CHAUFFEUR,
      },
      relations: {
        chauffeurProfile: true,
      },
    });

    const isChauffeurAvailableOnRequestedDateTime =
      this.isChauffeurAvailableOnRequestedDateTime(
        chauffeur,
        date,
        time,
        duration,
      );

    if (!isChauffeurAvailableOnRequestedDateTime) {
      throw new CustomHttpException({
        code: HttpStatus.BAD_GATEWAY,
        success: false,
        message:
          'Chauffeur not available Request date or time. Please change the date or time',
      });
    }

    const bookedSlots = await this.bookedSlotRepo.find({
      where: {
        chauffeurProfile: {
          id: chauffeur?.chauffeurProfile?.id,
        },
        dateTimeFrom: new Date(date),
      },
    });

    const isRequestedTimeBookedOrOverlapping =
      this.isRequestedTimeBookedOrOverlapping(
        date,
        time,
        duration,
        bookedSlots,
      );

    if (!isRequestedTimeBookedOrOverlapping) {
      throw new CustomHttpException({
        code: HttpStatus.BAD_GATEWAY,
        success: false,
        message:
          'Selected time is overlapping with existing bookings. please review the booked slots and choose the available time',
      });
    }

    return true;
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

  private isChauffeurAvailableOnRequestedDateTime(
    chauffeur: User,
    date: string,
    time: string,
    duration: number,
  ) {
    const requestedDateTimeForm = parse(
      `${date} ${time}`,
      'yyyy-MM-dd HH:mm',
      new Date(),
    );

    const requestedDateTimeTo = parse(
      `${date} ${time}`,
      'yyyy-MM-dd HH:mm',
      new Date(),
    );
    add(requestedDateTimeForm, { hours: duration });

    const requestedDay = requestedDateTimeForm.getDay();
    const requestedWeekDay = weekDays[requestedDay] as 'sunday';

    const isChauffeurAvailableOnThisDay =
      chauffeur.chauffeurProfile?.availability[requestedWeekDay]?.available;

    const isChauffeurAvailableFullDay =
      chauffeur.chauffeurProfile?.availability[requestedWeekDay]?.fullDay;

    const chauffeurAvailableFrom =
      chauffeur.chauffeurProfile?.availability[requestedWeekDay]?.from;
    const chauffeurAvailableTo =
      chauffeur.chauffeurProfile?.availability[requestedWeekDay]?.to;

    let isWithinRange = false;

    if (chauffeurAvailableFrom && chauffeurAvailableTo) {
      const chauffeurAvailableFromDateTime = parse(
        chauffeurAvailableFrom,
        'HH:mm',
        new Date(date),
      );

      const chauffeurAvailableToDateTime = parse(
        chauffeurAvailableTo,
        'HH:mm',
        new Date(date),
      );

      if (
        requestedDateTimeForm >= chauffeurAvailableFromDateTime &&
        requestedDateTimeTo <= chauffeurAvailableToDateTime
      ) {
        isWithinRange = true;
      }
    }

    if (isChauffeurAvailableOnThisDay && isChauffeurAvailableFullDay) {
      return true;
    } else if (isChauffeurAvailableOnThisDay && isWithinRange) {
      return true;
    } else {
      return false;
    }
  }

  private isRequestedTimeBookedOrOverlapping(
    date: string,
    time: string,
    duration: number,
    bookedSlots: BookedSlot[],
  ) {
    const requestedDateTimeForm = parse(
      `${date} ${time}`,
      'yyyy-MM-dd HH:mm',
      new Date(),
    );

    const requestedDateTimeTo = parse(
      `${date} ${time}`,
      'yyyy-MM-dd HH:mm',
      new Date(),
    );
    add(requestedDateTimeForm, { hours: duration });

    let isBookedOrOverlapping = false;

    bookedSlots.forEach((slot) => {
      const slotDateTimeFrom = slot.dateTimeFrom;

      const slotDateTimeTo = slot.dateTimeTo;

      const isRequestedFromTimeOverLap =
        requestedDateTimeForm >= slotDateTimeFrom &&
        requestedDateTimeForm <= slotDateTimeTo;

      const isRequestedToTimeOverLap =
        requestedDateTimeTo >= slotDateTimeFrom &&
        requestedDateTimeTo <= slotDateTimeTo;

      const isTimeSlotInBetween =
        requestedDateTimeForm <= slotDateTimeFrom &&
        requestedDateTimeTo >= slotDateTimeTo;

      if (
        isRequestedFromTimeOverLap ||
        isRequestedToTimeOverLap ||
        isTimeSlotInBetween
      ) {
        isBookedOrOverlapping = true;
      } else {
        isBookedOrOverlapping = false;
      }
    });

    return isBookedOrOverlapping;
  }
}
