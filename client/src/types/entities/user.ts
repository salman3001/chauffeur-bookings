import type { UserType } from '@/utils/enums/UserType'
import type { AdminProfile } from './adminProfile'
import type { ChauffeurProfile } from './chauffeurProfile'
import type { Notification } from './notification'
import type { Profile } from './profile'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string | null
  userType: UserType
  isActive: boolean
  emailVerified: boolean
  cretaedAt: string
  updatedAt: string
  deletedAt: string
  profile: Profile
  adminProfile?: AdminProfile
  chauffeurProfile?: ChauffeurProfile
  notifications: Notification[]
}
