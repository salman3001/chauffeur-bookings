import type { Booking } from './booking'
import type { ChauffeurProfile } from './chauffeurProfile'

export interface BookedSlot {
  id: number
  dateTimeFrom: string
  dateTimeTo: string
  booking: Booking
  chauffeurProfile: ChauffeurProfile
}
