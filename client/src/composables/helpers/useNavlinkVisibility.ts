import type { Menu } from '@/layouts/full/vertical-sidebar/sidebarItem'
import { useAuth } from './useAuth'

export const useNavlinkVisibility = () => {
  const { user, isUser } = useAuth()
  const isVisible = (item: Menu) => {
    let isAllowed = true

    if (item?.guest === true) {
      isAllowed = user.value ? false : true
    }

    if (item?.authRequired && !item?.requiredRole) {
      isAllowed = user.value ? true : false
    }

    if (item?.authRequired && item?.requiredRole) {
      if (user.value && isUser(item.requiredRole)) {
        isAllowed = true
      } else {
        isAllowed = false
      }
    }

    return isAllowed
  }

  return {
    isVisible
  }
}
