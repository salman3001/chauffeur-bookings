import { Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IBookingsPolicy } from './booking.policy';
import { AuthUserType } from 'src/core/utils/types/common';
import { Booking } from './entities/booking.entity';
import User from 'src/users/entities/user.entity';
import { UserType } from 'src/core/utils/enums/userType';
import { BookingStatus } from 'src/core/utils/enums/BookingStatus';
import { ConfigService } from '@salman3001/nest-config-module';
import { Config } from 'src/core/config/config';

@Injectable()
export class BookingsService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @Inject('BookingsPolicy')
    private readonly bookingsPolicy: PolicyService<IBookingsPolicy>,
    private readonly config: ConfigService,
  ) {}

  async create(createBookingDto: CreateBookingDto, authUser: AuthUserType) {
    this.bookingsPolicy.authorize('create', authUser);
    const customer = await this.dataSource.manager.findOneOrFail(User, {
      where: { id: authUser?.id },
      relations: {
        profile: true,
      },
    });

    const { chauffeurId, ...payload } = createBookingDto;
    const chauffeur = await this.dataSource.manager.findOneOrFail(User, {
      where: {
        id: chauffeurId,
        userType: UserType.CHAUFFEUR,
      },
      relations: {
        chauffeurProfile: true,
      },
    });

    const pricePerHour = chauffeur.chauffeurProfile.pricePerHour;
    const total = (
      Number(chauffeur.chauffeurProfile.pricePerHour) * payload.bookedForHours
    ).toFixed(2);

    const booking = new Booking();
    Object.assign(booking, createBookingDto);
    booking.pricePerHour = pricePerHour;
    booking.total = total;
    booking.chauffeurProfile = chauffeur.chauffeurProfile;
    booking.customerProfile = customer.profile;
    booking.status = BookingStatus.BOOKED;
    booking.history = [
      {
        dateTime: new Date(Date.now()),
        event: 'Booking Created',
        detail: `New booking created by customer ${customer.firstName}`,
      },
    ];

    const savedBooking = await this.dataSource.manager.save(booking);
    return savedBooking;
  }

  async findAll(
    authUser: AuthUserType,
    query?: {
      page?: number;
      perPage?: number;
      orderBy?: string;
    },
  ) {
    this.bookingsPolicy.authorize('findAll', authUser);
    let bookings: Booking[] = [];
    let count = 0;

    const take = query?.perPage || this.config.get<Config>().defaultPerPage;
    const skip = ((query?.page || 1) - 1) * take;

    const [orderBy, orderDirection] = query?.orderBy
      ? query?.orderBy.split(':')
      : [];

    if (authUser?.userType === UserType.CUSTOMER) {
      const bookingData = await this.dataSource.manager.findAndCount(Booking, {
        where: {
          customerProfile: {
            user: {
              id: authUser.id,
            },
          },
        },
        order: orderBy ? { [orderBy]: orderDirection } : {},
        skip,
        take,
      });
      bookings = bookingData[0];
      count = bookingData[1];
    }

    if (authUser?.userType === UserType.CHAUFFEUR) {
      const bookingData = await this.dataSource.manager.findAndCount(Booking, {
        where: {
          chauffeurProfile: {
            user: {
              id: authUser.id,
            },
          },
        },
        order: orderBy ? { [orderBy]: orderDirection } : {},
        skip,
        take,
      });
      bookings = bookingData[0];
      count = bookingData[1];
    }

    if (authUser?.userType === UserType.ADMIN) {
      const bookingData = await this.dataSource.manager.findAndCount(Booking, {
        order: orderBy ? { [orderBy]: orderDirection } : {},
        skip,
        take,
      });
      bookings = bookingData[0];
      count = bookingData[1];
    }

    return { bookings, count, perPage: take };
  }

  async findOne(id: number, authUser: AuthUserType) {
    const booking = await this.dataSource.manager.findOneOrFail(Booking, {
      where: { id: id },
      relations: {
        customerProfile: {
          user: true,
        },
        chauffeurProfile: {
          user: true,
        },
      },
    });
    this.bookingsPolicy.authorize('find', authUser, booking);
    return booking;
  }

  async rejectBooking(id: number, authUser: AuthUserType) {
    const booking = await this.dataSource.manager.findOneOrFail(Booking, {
      where: { id: id },
      relations: {
        customerProfile: {
          user: true,
        },
        chauffeurProfile: {
          user: true,
        },
      },
    });
    this.bookingsPolicy.authorize('rejectBooking', authUser, booking);
    booking.status = BookingStatus.REJECTED;
    booking.history.push({
      dateTime: new Date(Date.now()),
      event: 'Booking Rejected',
      detail: `Booking rejected`,
    });
    await this.dataSource.manager.save(booking);
    return booking;
  }

  async acceptBooking(id: number, authUser: AuthUserType) {
    const booking = await this.dataSource.manager.findOneOrFail(Booking, {
      where: { id: id },
      relations: {
        customerProfile: {
          user: true,
        },
        chauffeurProfile: {
          user: true,
        },
      },
    });
    this.bookingsPolicy.authorize('acceptBooking', authUser, booking);
    booking.status = BookingStatus.ACCEPTED;
    booking.history.push({
      dateTime: new Date(Date.now()),
      event: 'Booking Accepted',
      detail: `Booking accepted`,
    });
    await this.dataSource.manager.save(booking);
    return booking;
  }

  async cancleBooking(id: number, authUser: AuthUserType) {
    const booking = await this.dataSource.manager.findOneOrFail(Booking, {
      where: { id: id },
      relations: {
        customerProfile: {
          user: true,
        },
        chauffeurProfile: {
          user: true,
        },
      },
    });
    this.bookingsPolicy.authorize('cancleBooking', authUser, booking);
    booking.status = BookingStatus.CANCLED;
    booking.history.push({
      dateTime: new Date(Date.now()),
      event: 'Booking Cancled',
      detail: `Booking cancled by customer`,
    });
    await this.dataSource.manager.save(booking);
    return booking;
  }

  async startTrip(id: number, authUser: AuthUserType) {
    const booking = await this.dataSource.manager.findOneOrFail(Booking, {
      where: { id: id },
      relations: {
        customerProfile: {
          user: true,
        },
        chauffeurProfile: {
          user: true,
        },
      },
    });
    this.bookingsPolicy.authorize('startTrip', authUser, booking);
    booking.status = BookingStatus.TRIP_STARTED;
    booking.history.push({
      dateTime: new Date(Date.now()),
      event: 'Booking trip started',
      detail: `Booking trip has started. Chauffeur is on the way`,
    });
    await this.dataSource.manager.save(booking);
    return booking;
  }

  async completeBooking(id: number, authUser: AuthUserType) {
    const booking = await this.dataSource.manager.findOneOrFail(Booking, {
      where: { id: id },
      relations: {
        customerProfile: {
          user: true,
        },
        chauffeurProfile: {
          user: true,
        },
      },
    });
    this.bookingsPolicy.authorize('compeleteBooking', authUser, booking);
    booking.status = BookingStatus.COMPLETE;
    booking.history.push({
      dateTime: new Date(Date.now()),
      event: 'Booking completed',
      detail: `Booking trip has completed`,
    });
    await this.dataSource.manager.save(booking);
    return booking;
  }
}
