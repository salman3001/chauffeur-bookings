import { Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PolicyService } from '@salman3001/nest-policy-module';
import { IBookingsPolicy } from './booking.policy';
import { AuthUserType } from 'src/core/utils/types/common';
import { Booking } from './entities/booking.entity';
import { UserType } from 'src/core/utils/enums/userType';
import { BookingStatus } from 'src/core/utils/enums/BookingStatus';
import { BookingFilterQuery, BookingRepository } from './booking.repository';
import { UserRepository } from 'src/users/user.repository';
import { BookedSlotRepository } from 'src/booked-slots/booked-slot.repository';
import { Availability } from 'src/chauffeur-profiles/fixtures/availability';
import { CustomHttpException } from 'src/core/utils/Exceptions/CustomHttpException';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BookedSlot } from 'src/booked-slots/entities/booked-slot.entity';

@Injectable()
export class BookingsService {
  constructor(
    @Inject('BookingsPolicy')
    private readonly bookingsPolicy: PolicyService<IBookingsPolicy>,
    private bookingRepo: BookingRepository,
    private readonly bookedSlotRepo: BookedSlotRepository,
    private userRepo: UserRepository,
    @InjectDataSource() private dataSource: DataSource,
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

    const { chauffeurId, slots, pickupDate, ...payload } = createBookingDto;

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

    // get bookedSlots
    const alreadyBookedSlots =
      await this.bookedSlotRepo.getChauffeurBookedSlotsByDate(
        chauffeurId,
        new Date(pickupDate),
      );

    // validate incoming slots
    slots.forEach((slot) => {
      this.validateSlot(chauffeurId, alreadyBookedSlots, slot);
    });

    const pricePerHour = chauffeur.chauffeurProfile.pricePerHour;

    const total = (
      Number(chauffeur.chauffeurProfile.pricePerHour) * payload.bookedForHours
    ).toFixed(2);

    return this.dataSource.transaction(async (manager) => {
      // create slots
      const bookedSlots: BookedSlot[] = [];
      for (const slot of slots) {
        const bookedSlot = this.bookedSlotRepo.create({
          date: pickupDate,
          slotName: slot.name,
          time: slot.time,
        });

        await manager.save(bookedSlot);
        bookedSlots.push(bookedSlot);
      }

      // create booking and assign properties
      const booking = this.bookingRepo.create(createBookingDto);
      booking.pricePerHour = pricePerHour;
      booking.total = total;
      booking.chauffeurProfile = chauffeur.chauffeurProfile;
      booking.customerProfile = customer.profile;
      booking.status = BookingStatus.BOOKED;
      booking.bookedSlot = bookedSlots;
      booking.history = [
        {
          dateTime: new Date(Date.now()),
          event: 'Booking Created',
          detail: `New booking created by customer ${customer.firstName}`,
        },
      ];

      const savedBooking = await manager.save(booking);
      return savedBooking;
    });
  }

  async findAll(authUser: AuthUserType, query?: BookingFilterQuery) {
    this.bookingsPolicy.authorize('findAll', authUser);
    let bookings: Booking[] = [];
    let count = 0;
    let perPage = 0;

    if (authUser?.userType === UserType.CUSTOMER) {
      const bookingData = await this.bookingRepo.getCustomersBookings(
        authUser?.id,
        query,
      );
      bookings = bookingData.results;
      count = bookingData.count;
      perPage = bookingData.perPage;
    }

    if (authUser?.userType === UserType.CHAUFFEUR) {
      const bookingData = await this.bookingRepo.getchauffeurBookings(
        authUser?.id,
        query,
      );
      bookings = bookingData.results;
      count = bookingData.count;
      perPage = bookingData.perPage;
    }

    if (authUser?.userType === UserType.ADMIN) {
      const bookingData = await this.bookingRepo.getAdminBookings(query);
      bookings = bookingData.results;
      count = bookingData.count;
      perPage = bookingData.perPage;
    }

    return { bookings, count, perPage };
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
      dateTime: new Date(Date.now()),
      event: 'Booking Rejected',
      detail: `Booking rejected`,
    });
    await this.bookingRepo.save(booking);
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
      dateTime: new Date(Date.now()),
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
      dateTime: new Date(Date.now()),
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
      dateTime: new Date(Date.now()),
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
      dateTime: new Date(Date.now()),
      event: 'Booking completed',
      detail: `Booking trip has completed`,
    });
    await this.bookingRepo.save(booking);
    return booking;
  }

  validateSlot(
    chauffeurId: number,
    alreadyBookedSlots: BookedSlot[],
    slot: Availability['friday'][0],
  ) {
    const validSlot = alreadyBookedSlots.filter((s) => {
      s.slotName === slot.name;
    });

    if (validSlot.length === 0) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: 'Invalid booking slots provided',
      });
    }
  }
}
