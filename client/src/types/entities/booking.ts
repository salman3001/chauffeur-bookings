import type { BookingStatus } from '@/utils/enums/BookingStatus'
import type { BookedSlot } from './bookedSlot'
import type { ChauffeurProfile } from './chauffeurProfile'
import type { Geometry } from './geometry'
import type { PaymentMode } from '@/utils/enums/PaymentMode'
import type { BookingHistory } from './bookingHistory'
import type { Profile } from './profile'

export interface Booking {
  id: number
  pickupAddress: string
  pickupCords: Geometry
  dropoffAddress: string
  dropoffCords: Geometry
  bookedForHours: number
  pricePerHour: string
  total: string
  status: BookingStatus
  paymentMode: PaymentMode
  history: BookingHistory[]
  payment: any
  customerProfile: Profile
  chauffeurProfile: ChauffeurProfile
  bookedSlot: BookedSlot
  createdAt: string
  updatedAt: string
}
