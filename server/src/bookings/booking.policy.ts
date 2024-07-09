import { AuthUserType } from 'src/utils/types/common';
import { Booking } from './entities/booking.entity';
import { UserType } from 'src/utils/enums/userType';
import { BookingStatus } from 'src/utils/enums/BookingStatus';

export const BookingsPolicy = {
  find(user: AuthUserType, booking: Booking) {
    return (
      user?.userType === UserType.ADMIN ||
      booking?.chauffeurProfile?.user?.id === user?.id ||
      booking?.customerProfile?.user.id === user?.id
    );
  },

  findAll(user: AuthUserType) {
    return user?.userType === UserType.ADMIN;
  },

  findCusomerBookings(user: AuthUserType) {
    return user ? true : false;
  },
  findChauffeurBookings(user: AuthUserType) {
    return user?.userType === UserType.CHAUFFEUR;
  },
  create(user: AuthUserType) {
    return user ? true : false;
  },

  rejectBooking(user: AuthUserType, booking: Booking) {
    const canReject =
      booking.status === BookingStatus.BOOKED &&
      booking?.chauffeurProfile?.user?.id === user?.id;
    if (user?.userType === UserType.ADMIN || canReject) {
      return true;
    } else {
      return false;
    }
  },

  acceptBooking(user: AuthUserType, booking: Booking) {
    const canAccept =
      booking.status === BookingStatus.BOOKED &&
      booking?.chauffeurProfile?.user?.id === user?.id;
    if (user?.userType === UserType.ADMIN || canAccept) {
      return true;
    } else {
      return false;
    }
  },

  cancleBooking(user: AuthUserType, booking: Booking) {
    const isStatusValid = ![
      BookingStatus.REJECTED,
      BookingStatus.TRIP_STARTED,
      BookingStatus.COMPLETE,
    ].includes(booking.status);

    const canCancle =
      isStatusValid && booking?.customerProfile?.user?.id === user?.id;

    if (user?.userType === UserType.ADMIN || canCancle) {
      return true;
    } else {
      return false;
    }
  },

  startTrip(user: AuthUserType, booking: Booking) {
    const isStatusValid = ![
      BookingStatus.REJECTED,
      BookingStatus.COMPLETE,
      BookingStatus.CANCLED,
    ].includes(booking.status);

    const canStartTrip =
      isStatusValid && booking?.chauffeurProfile?.user?.id === user?.id;

    if (user?.userType === UserType.ADMIN || canStartTrip) {
      return true;
    } else {
      return false;
    }
  },

  compeleteBooking(user: AuthUserType, booking: Booking) {
    const isStatusValid = [BookingStatus.TRIP_STARTED].includes(booking.status);
    const canCompleteBooking =
      isStatusValid && booking?.chauffeurProfile?.user?.id === user?.id;

    if (user?.userType === UserType.ADMIN || canCompleteBooking) {
      return true;
    } else {
      return false;
    }
  },
};

export type IBookingsPolicy = typeof BookingsPolicy;
