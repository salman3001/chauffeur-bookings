import { useRoute, useRouter } from 'vue-router'
import useApiForm from '../useApiForm'

export const useLogin = (initForm: { email: string; password: string }) => {
  const router = useRouter()
  const route = useRoute()
  const { next } = route.query as Record<string, string>
  const form = useApiForm(initForm)

  const login = () =>
    form.post(
      '/auth/login',
      {},
      {
        onSucess: () => {
          if (next) {
            router.push(next)
          } else {
            router.push({ name: 'Home' })
          }
        }
      }
    )

  return {
    form,
    login
  }
}
