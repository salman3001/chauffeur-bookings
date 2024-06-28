export interface Menu {
  header?: string
  title?: string
  icon?: any
  to?: string
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
}

const sidebarItem: Menu[] = [
  { header: 'Home' },
  {
    title: 'Dashboard',
    icon: 'widget-add-line-duotone',
    to: '/'
  },

  { header: 'Extra' },
  {
    title: 'Icons',
    icon: 'sticker-smile-circle-2-line-duotone',
    to: '/icons'
  },
  {
    title: 'Typography',
    icon: 'text-circle-outline',
    to: '/ui/typography'
  },
  {
    title: 'Shadow',
    icon: 'watch-square-minimalistic-charge-line-duotone',
    to: '/ui/shadow'
  },
  {
    title: 'auth',
    header: 'auth'
  },

  {
    title: 'Login',
    icon: 'login-3-line-duotone',
    to: '/auth/login'
  },
  {
    title: 'Register',
    icon: 'user-plus-rounded-line-duotone',
    to: '/auth/register'
  }
]

export default sidebarItem
