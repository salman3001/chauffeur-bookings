import type { Availability } from './availablity'
import type { BookedSlot } from './bookedSlot'
import type { Booking } from './booking'
import type { Car } from './car'
import type { User } from './user'

export interface ChauffeurProfile {
  id: number
  pricePerHour: string
  availability: Availability
  bookings: Booking[]
  car: Car
  user: User
  bookedSlots: BookedSlot[]
}
