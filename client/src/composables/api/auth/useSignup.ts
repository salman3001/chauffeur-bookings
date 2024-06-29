import { useRouter } from 'vue-router'
import useApiForm from '../useApiForm'

export const useSignup = (initialForm: {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
}) => {
  const router = useRouter()
  const form = useApiForm(initialForm)

  const sigup = () =>
    form.post(
      '/auth/register',
      {},
      {
        onSucess: () => {
          router.push({ name: 'Check-Email' })
        }
      }
    )

  return {
    form,
    sigup
  }
}
