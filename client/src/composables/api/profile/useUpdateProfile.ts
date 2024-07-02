import { useRouter } from 'vue-router'
import useApiForm from '../useApiForm'
import useApiGet from '../useApiGet'
import { onMounted } from 'vue'
import type { Profile } from '@/types/entities/profile'

export const useUpdateProfile = () => {
  const router = useRouter()
  const { data: profile, exec } = useApiGet<Profile>()

  const form = useApiForm({
    avatar: undefined as undefined | File
  })

  const updateProfile = () =>
    form.patch(
      '/my-profile',
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      },
      {
        onSucess() {
          // @ts-ignore
          router.go()
        }
      }
    )

  onMounted(async () => {
    await exec(`/my-profile`, {})
    if (profile.value) {
      form.assign(profile.value)
    }
  })

  return {
    form,
    updateProfile,
    profile
  }
}
