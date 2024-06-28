import type { UserType } from '@/utils/enums/UserType'
import { useAuth } from './useAuth'
import type { NavigationGuardNext } from 'vue-router'

export const useNavGuard = (meta: any, next: NavigationGuardNext) => {
  const { user, is } = useAuth()
  const requiresAuth = meta?.requiresAuth
  const role = meta?.role as UserType
  const guest = meta?.guest as UserType

  if (guest && user.value) {
    next({ name: 'Dashboard' })
  }

  if (requiresAuth && !role) {
    if (user.value) {
      next()
      return
    } else {
      next({ name: 'Login' })
      return
    }
  }

  if (requiresAuth && role) {
    if (user.value && is(role)) {
      next()
      return
    } else {
      next({ name: 'Denied' })
      return
    }
  }

  next()
}
