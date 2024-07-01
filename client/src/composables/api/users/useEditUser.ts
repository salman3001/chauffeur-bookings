import useApiForm from '../useApiForm'
import { useRoute, useRouter } from 'vue-router'
import useApiGet from '../useApiGet'
import type { User } from '@/types/entities/user'
import { onMounted, ref } from 'vue'
import { UserType } from '@/utils/enums/UserType'

export const useEditUser = () => {
  const route = useRoute()
  const { data: user, exec, processing: loadingUser } = useApiGet<User>()

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
    form.pacth(
      `users/${route.params.id}/`,
      {},
      {
        onSucess() {
          router.push({ name: 'Users.Index' })
        }
      }
    )

  onMounted(async () => {
    await exec(`/users/${route.params.id}`)
    if (user.value) {
      form.assign(user.value)
    }
  })

  return {
    form,
    createUser,
    user
  }
}
