import type { NotificationTypes } from '@/utils/enums/NotificationTypes'

export interface BaseNotification {
  type: NotificationTypes
  title: string
  subTitle: string
}

export interface BookingCreatedNotification extends BaseNotification {
  type: NotificationTypes.BOOKING_CREATED
  meta: {
    bookingId: number
  }
}

export interface BookingRecievedNotification extends BaseNotification {
  type: NotificationTypes.BOOKING_RECIEVED
  meta: {
    bookingId: number
  }
}

export interface BookingConfirmedNotification extends BaseNotification {
  type: NotificationTypes.BOOKING_COMFIRMED
  meta: {
    bookingId: number
  }
}

export interface BookingCancledNotification extends BaseNotification {
  type: NotificationTypes.BOOKING_CANCLED
  meta: {
    bookingId: number
  }
}

export interface BookingRejectedNotification extends BaseNotification {
  type: NotificationTypes.BOOKING_REJECTED
  meta: {
    bookingId: number
  }
}

export interface BookingTripStartedNotification extends BaseNotification {
  type: NotificationTypes.BOOKING_TRIP_STARTED
  meta: {
    bookingId: number
  }
}

export interface BookingCompleteNotification {
  type: NotificationTypes.BOOKING_CREATED
  meta: {
    bookingId: number
  }
}

export interface PaymentRecievedNotification {
  type: NotificationTypes.PAYMENT_RECIEVED
  meta: {
    paymentId: number
  }
}

export interface RefundInitiatedNotification extends BaseNotification {
  type: NotificationTypes.REFUND_INITIATED
  meta: {
    refundId: number
  }
}

export interface RefundIssuedNotification extends BaseNotification {
  type: NotificationTypes.REFUND_ISSUED
  meta: {
    refundId: number
  }
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
  | RefundIssuedNotification
