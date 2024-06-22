import { NotificationType } from '../enums/NotificationType';

export interface BaseNotification {
  type: NotificationType;
  title: string;
  subTitle: string;
  meta: any;
}

export interface BookingCreatedNotification extends BaseNotification {
  type: NotificationType.BOOKING_CREATED;
  meta: {
    bookingId: number;
  };
}

export interface BookingRecievedNotification extends BaseNotification {
  type: NotificationType.BOOKING_RECIEVED;
  meta: {
    bookingId: number;
  };
}

export interface BookingConfirmedNotification extends BaseNotification {
  type: NotificationType.BOOKING_COMFIRMED;
  meta: {
    bookingId: number;
  };
}

export interface BookingCancledNotification extends BaseNotification {
  type: NotificationType.BOOKING_CANCLED;
  meta: {
    bookingId: number;
  };
}

export interface BookingRejectedNotification extends BaseNotification {
  type: NotificationType.BOOKING_REJECTED;
  meta: {
    bookingId: number;
  };
}

export interface BookingTripStartedNotification extends BaseNotification {
  type: NotificationType.BOOKING_TRIP_STARTED;
  meta: {
    bookingId: number;
  };
}

export interface BookingCompleteNotification {
  type: NotificationType.BOOKING_CREATED;
  meta: {
    bookingId: number;
  };
}

export interface PaymentRecievedNotification {
  type: NotificationType.PAYMENT_RECIEVED;
  meta: {
    paymentId: number;
  };
}

export interface RefundInitiatedNotification extends BaseNotification {
  type: NotificationType.REFUND_INITIATED;
  meta: {
    refundId: number;
  };
}

export interface RefundIssuedNotification extends BaseNotification {
  type: NotificationType.REFUND_ISSUED;
  meta: {
    refundId: number;
  };
}

export type NotificationData =
  | BaseNotification
  | BookingCreatedNotification
  | BookingConfirmedNotification
  | BookingRejectedNotification
  | BookingCancledNotification
  | BookingTripStartedNotification
  | BookingCompleteNotification
  | PaymentRecievedNotification
  | RefundInitiatedNotification
  | RefundIssuedNotification;
