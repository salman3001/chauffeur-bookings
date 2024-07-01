import type { Image } from './Image'
import type { AdminProfile } from './adminProfile'
import type { ChauffeurProfile } from './chauffeurProfile'

export interface Car {
  id: number
  name: string
  make: string
  year: number
  image?: Image
  createdAt: Date
  updatedAt: Date
  owner: AdminProfile
  chauffeurProfile: ChauffeurProfile
}
