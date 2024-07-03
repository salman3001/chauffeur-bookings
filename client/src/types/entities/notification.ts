import type { NotificationData } from '../interfaces/NotificationData'
import type { User } from './user'

export interface Notification {
  id: number
  data: NotificationData
  readAt: string | null
  user: User
  createdAt: Date
  updatedAt: Date
}
