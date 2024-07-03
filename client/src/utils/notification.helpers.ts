import type { Notification } from '@/types/entities/notification'
import { NotificationTypes } from './enums/NotificationTypes'
import type { RouteLocationAsRelativeGeneric } from 'vue-router'
import type { BaseNotification } from '@/types/interfaces/NotificationData'

export const resolveNotificationLink = (n?: Notification): RouteLocationAsRelativeGeneric => {
  if (n) {
    if (n.data.type === NotificationTypes.BOOKING_CREATED) return { name: 'Home' }
    else return { name: 'Home' }
  } else return { name: 'Home' }
}

export const resolveNotifcationTitle = (n?: Notification) => {
  return (n?.data as BaseNotification).title
}

export const resolveNotifcationSubtitle = (n?: Notification) => {
  return (n?.data as BaseNotification).subTitle
}

export const resolveNotificationIcon = (n?: Notification) => {
  if (n) {
    if (n.data.type === NotificationTypes.BOOKING_CREATED) return 'tabler-shopping-cart'
    if (n.data.type === NotificationTypes.BOOKING_RECIEVED) return 'tabler-shopping-cart'
    else return 'tabler-circle-dot'
  } else {
    return 'tabler-circle-dot'
  }
}
