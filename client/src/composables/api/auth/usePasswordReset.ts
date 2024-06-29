import { useRoute, useRouter } from 'vue-router'
import useApiForm from '../useApiForm'
import { useToast } from 'vue-toastification'

export const usePasswordReset = (initForm: { password: '' }) => {
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()

  const form = useApiForm({ jwt: '', ...initForm })

  const jwt = route?.query?.jwt as string

  if (!jwt) {
    toast.error('Token not found')
  }

  form.jwt = jwt

  const resetPassword = () =>
    form.post(
      '/auth/reset-password',
      {},
      {
        onSucess: () => {
          router.push({ name: 'Login' })
        }
      }
    )

  return {
    resetPassword,
    form
  }
}
