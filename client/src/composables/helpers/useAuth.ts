import type { User } from '@/types/interfaces/User'
import { useCookie } from './useCookie'
import { ref } from 'vue'

const user = ref<User | null>()

export const useAuth = () => {
  const cookies = useCookie()
  user.value = cookies.get<User | null>('user')

  const is = (role: User['userType']) => {
    return user.value?.userType === role
  }

  return {
    user,
    is
  }
}
