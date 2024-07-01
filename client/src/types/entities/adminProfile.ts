import type { Car } from './car'
import type { User } from './user'

export interface AdminProfile {
  id: number
  cars: Car[]
  user: User
}
