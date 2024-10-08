import { Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IBookingsPolicy } from './booking.policy';
import { AuthUserType } from 'src/utils/types/common';
import { Booking } from './entities/booking.entity';
import { UserType } from 'src/utils/enums/userType';
import { BookingStatus } from 'src/utils/enums/BookingStatus';
import { BookingFilterQuery, BookingRepository } from './booking.repository';
import { UserRepository } from 'src/users/user.repository';
import { BookedSlotRepository } from 'src/booked-slots/booked-slot.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MailsService } from 'src/mails/mails.service';
import { DateTime } from 'luxon';

@Injectable()
export class BookingsService {
  constructor(
    @Inject('BookingsPolicy')
    private readonly bookingsPolicy: PolicyService<IBookingsPolicy>,
    private bookingRepo: BookingRepository,
    private readonly bookedSlotRepo: BookedSlotRepository,
    private userRepo: UserRepository,
    private userService: UsersService,
    @InjectDataSource() private dataSource: DataSource,
    private notificationService: NotificationsService,
    private mailservice: MailsService,
  ) {}

  async create(createBookingDto: CreateBookingDto, authUser: AuthUserType) {
    this.bookingsPolicy.authorize('create', authUser);
    // get customer
    const customer = await this.userRepo.findOneOrFail({
      where: { id: authUser?.id },
      relations: {
        profile: true,
      },
    });

    const { chauffeurId, pickupDateTime, ...payload } = createBookingDto;

    // get chauffeur
    const chauffeur = await this.userRepo.findOneOrFail({
      where: {
        id: chauffeurId,
        userType: UserType.CHAUFFEUR,
      },
      relations: {
        chauffeurProfile: true,
      },
    });

    await this.userService.checkAvailabilty(
      chauffeurId,
      {
        dateTime: pickupDateTime,
        duration: createBookingDto.bookedForHours,
      },
      authUser,
    );

    const pricePerHour = chauffeur.chauffeurProfile.pricePerHour;

    const total = (
      Number(chauffeur.chauffeurProfile.pricePerHour) * payload.bookedForHours
    ).toFixed(2);

    return this.dataSource.transaction(async (manager) => {
      // create slots
      const pickupDateTimeFrom = DateTime.fromISO(pickupDateTime);
      const pickupDateTimeTo = DateTime.fromISO(pickupDateTime).plus({
        hour: payload.bookedForHours,
      });

      const bookedSlot = this.bookedSlotRepo.create({
        dateTimeFrom: pickupDateTimeFrom.toJSDate(),
        dateTimeTo: pickupDateTimeTo.toJSDate(),
        chauffeurProfile: chauffeur.chauffeurProfile,
      });

      const savedBookedSlot = await manager.save(bookedSlot);

      // create booking and assign properties
      const booking = this.bookingRepo.create(createBookingDto);
      booking.pricePerHour = pricePerHour;
      booking.total = total;
      booking.chauffeurProfile = chauffeur.chauffeurProfile;
      booking.customerProfile = customer.profile;
      booking.status = BookingStatus.BOOKED;
      booking.bookedSlot = savedBookedSlot;
      booking.history = [
        {
          dateTime: DateTime.local().toJSDate(),
          event: 'Booking Created',
          detail: `New booking created by customer ${customer.firstName}`,
        },
      ];

      const savedBooking = await manager.save(booking);

      //mails and notifications
      // await this.mailservice.sendBookingCreatedEmail(customer.email, {
      //   customerName: customer.firstName,
      // });

      // await this.notificationService.sendBookingCreated(
      //   customer,
      //   savedBooking.id,
      // );

      // await this.notificationService.sendBookingRecieved(
      //   chauffeur,
      //   savedBooking.id,
      // );

      // const admins = await this.userRepo.findBy({
      //   userType: UserType.ADMIN,
      //   isActive: true,
      // });

      // for (const admin of admins) {
      //   await this.notificationService.sendBookingRecieved(
      //     admin,
      //     savedBooking.id,
      //   );
      // }

      return savedBooking;
    });
  }

  async findAll(authUser: AuthUserType, query?: BookingFilterQuery) {
    this.bookingsPolicy.authorize('findAll', authUser);

    return this.bookingRepo.getAdminBookings(query);
  }

  async findCusomerBookings(
    authUser: AuthUserType,
    query?: BookingFilterQuery,
  ) {
    this.bookingsPolicy.authorize('findCusomerBookings', authUser);

    return await this.bookingRepo.getCustomersBookings(
      authUser?.id as number,
      query,
    );
  }

  async findChauffeurBookings(
    authUser: AuthUserType,
    query?: BookingFilterQuery,
  ) {
    this.bookingsPolicy.authorize('findChauffeurBookings', authUser);

    return await this.bookingRepo.getchauffeurBookings(
      authUser?.id as number,
      query,
    );
  }

  async findOne(id: number, authUser: AuthUserType) {
    const booking = await this.bookingRepo.findOneOrFail({
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
    const booking = await this.bookingRepo.findOneOrFail({
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
      dateTime: DateTime.local().toJSDate(),
      event: 'Booking Rejected',
      detail: `Booking rejected`,
    });
    await this.bookingRepo.save(booking);

    //mails and notifications

    return booking;
  }

  async acceptBooking(id: number, authUser: AuthUserType) {
    const booking = await this.bookingRepo.findOneOrFail({
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
      dateTime: DateTime.local().toJSDate(),
      event: 'Booking Accepted',
      detail: `Booking accepted`,
    });
    await this.bookingRepo.save(booking);
    return booking;
  }

  async cancleBooking(id: number, authUser: AuthUserType) {
    const booking = await this.bookingRepo.findOneOrFail({
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
      dateTime: DateTime.local().toJSDate(),
      event: 'Booking Cancled',
      detail: `Booking cancled by customer`,
    });
    await this.bookingRepo.save(booking);
    return booking;
  }

  async startTrip(id: number, authUser: AuthUserType) {
    const booking = await this.bookingRepo.findOneOrFail({
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
      dateTime: DateTime.local().toJSDate(),
      event: 'Booking trip started',
      detail: `Booking trip has started. Chauffeur is on the way`,
    });
    await this.bookingRepo.save(booking);
    return booking;
  }

  async completeBooking(id: number, authUser: AuthUserType) {
    const booking = await this.bookingRepo.findOneOrFail({
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
      dateTime: DateTime.local().toJSDate(),
      event: 'Booking completed',
      detail: `Booking trip has completed`,
    });
    await this.bookingRepo.save(booking);
    return booking;
  }
}
