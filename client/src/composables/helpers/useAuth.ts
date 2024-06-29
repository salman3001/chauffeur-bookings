import type { User } from '@/types/interfaces/User'
import { ref } from 'vue'
import { cookie } from '@/utils/cookies'

export const useAuth = () => {
  const user = ref(cookie.get<User | null>('user'))

  const isUser = (role: User['userType']) => {
    return user.value?.userType === role
  }

  return {
    user,
    isUser
  }
}
