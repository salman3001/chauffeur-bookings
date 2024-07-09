import { BookingStatus } from './enums/BookingStatus'

export const resolveBookingStatus = (status: BookingStatus) => {
  if (status === BookingStatus.COMPLETE) return { text: 'Completed', color: 'success' }
  if (status === BookingStatus.ACCEPTED) return { text: 'Accepted', color: 'info' }
  if (status === BookingStatus.TRIP_STARTED) return { text: 'Trip Started', color: 'warning' }
  if (status === BookingStatus.REJECTED) return { text: 'Rejected', color: 'error' }
  if (status === BookingStatus.CANCLED) return { text: 'Canceled', color: 'error' }
}
