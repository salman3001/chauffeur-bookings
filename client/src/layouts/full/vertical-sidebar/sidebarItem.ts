import appConfig from '@/config/app.config'
import { UserType } from '@/utils/enums/UserType'
import type { RouteLocationAsRelativeGeneric } from 'vue-router'

export interface Menu {
  header?: string
  title?: string
  icon?: any
  to?: string | RouteLocationAsRelativeGeneric
  chip?: string
  BgColor?: string
  chipBgColor?: string
  chipColor?: string
  chipVariant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  chipIcon?: string
  children?: Menu[]
  disabled?: boolean
  type?: string
  subCaption?: string
  authRequired?: boolean
  guest?: boolean
  requiredRole?: UserType
}

const sidebarItem: Menu[] = [
  {
    title: 'Booking',
    icon: 'home-linear',
    to: { name: 'Home' }
  },
  {
    title: 'Login',
    icon: 'login-3-line-duotone',
    to: { name: 'Login' },
    guest: true
  },
  {
    title: 'Register',
    icon: 'user-plus-rounded-line-duotone',
    to: { name: 'Register' },
    guest: true
  },
  { header: 'Admin', authRequired: true, requiredRole: UserType.ADMIN },
  {
    title: 'Dashboard',
    icon: 'widget-add-line-duotone',
    to: { name: 'Dashboard' },
    authRequired: true,
    requiredRole: UserType.ADMIN
  },
  {
    title: 'Users',
    icon: 'widget-add-line-duotone',
    to: { name: 'Users' },
    authRequired: true,
    requiredRole: UserType.ADMIN
  }
]

const devOnlyRoutes: Menu[] = [
  { header: 'Dev' },
  {
    title: 'Icons',
    icon: 'sticker-smile-circle-2-line-duotone',
    to: { name: 'Icons' }
  },
  {
    title: 'Typography',
    icon: 'text-circle-outline',
    to: { name: 'Typography' }
  },
  {
    title: 'Shadow',
    icon: 'watch-square-minimalistic-charge-line-duotone',
    to: { name: 'Shadow' }
  }
]

export default appConfig.isDev ? sidebarItem.concat(devOnlyRoutes) : sidebarItem
