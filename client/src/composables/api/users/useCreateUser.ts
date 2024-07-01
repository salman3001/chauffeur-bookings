import { UserType } from '@/utils/enums/UserType'
import useApiForm from '../useApiForm'
import { useRouter } from 'vue-router'

export const useCreateUser = () => {
  const router = useRouter()

  const form = useApiForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    userType: UserType.CUSTOMER,
    isActive: false,
    emailVerified: false
  })

  const createUser = () =>
    form.post(
      '/users',
      {},
      {
        onSucess() {
          router.push({ name: 'Users.Index' })
        }
      }
    )

  return {
    form,
    createUser
  }
}
