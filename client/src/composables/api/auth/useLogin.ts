import { useRouter } from 'vue-router'
import useApiForm from '../useApiForm'

export const useLogin = (initForm: { email: string; password: string }) => {
  const router = useRouter()
  const form = useApiForm(initForm)

  const login = () =>
    form.post(
      '/auth/login',
      {},
      {
        onSucess: () => {
          router.push({ name: 'Home' })
        }
      }
    )

  return {
    form,
    login
  }
}
