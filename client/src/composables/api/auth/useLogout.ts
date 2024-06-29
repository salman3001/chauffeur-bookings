import { useRouter } from 'vue-router'
import useApiForm from '../useApiForm'

export const useLogout = () => {
  const router = useRouter()
  const form = useApiForm({})

  const logout = () =>
    form.post(
      '/auth/logout',
      {},
      {
        onSucess: () => {
          router.push({ name: 'Login' })
        }
      }
    )

  return {
    logout
  }
}
