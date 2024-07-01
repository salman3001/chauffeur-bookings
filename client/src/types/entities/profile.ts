import type { Image } from './Image'
import type { Booking } from './booking'
import type { User } from './user'

export interface Profile {
  id: number
  avatar?: Image
  user: User
  bookings: Booking[]
}
