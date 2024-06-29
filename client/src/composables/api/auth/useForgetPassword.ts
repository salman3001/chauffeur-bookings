import { useRouter } from 'vue-router'
import useApiForm from '../useApiForm'

export const useForgetPassword = (initForm: { email: string }) => {
  const router = useRouter()
  const form = useApiForm(initForm)

  const reset = () =>
    form.post(
      '/auth/forgot-password',
      {},
      {
        onSucess: () => {
          router.push({ name: 'Check-Email' })
        }
      }
    )

  return {
    form,
    reset
  }
}
