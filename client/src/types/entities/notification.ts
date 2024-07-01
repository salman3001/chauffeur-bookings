import type { User } from './user'

export interface Notification {
  id: number
  data: any
  readAt: string | null
  user: User
  createdAt: Date
  updatedAt: Date
}
