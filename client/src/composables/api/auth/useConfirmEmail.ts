import { useRoute, useRouter } from 'vue-router'
import useApiForm from '../useApiForm'
import { useToast } from 'vue-toastification'

export const useConfirmEmail = () => {
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()

  const form = useApiForm({ jwt: '' })

  const jwt = route?.query?.jwt as string

  if (!jwt) {
    toast.error('Token not found')
  }

  form.jwt = jwt

  const confirmEmail = () =>
    form.post(
      '/auth/confirm-email',
      {},
      {
        onSucess: () => {
          router.push({ name: 'Home' })
        }
      }
    )

  return {
    confirmEmail
  }
}
