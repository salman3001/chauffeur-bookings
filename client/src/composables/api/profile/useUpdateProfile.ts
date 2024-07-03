import { useRouter } from 'vue-router'
import useApiForm from '../useApiForm'
import useApiGet from '../useApiGet'
import { onMounted } from 'vue'
import type { Profile } from '@/types/entities/profile'
import { dp } from './useAvatar'

export const useUpdateProfile = () => {
  const router = useRouter()
  const { data: profile, exec } = useApiGet<Profile>()

  const form = useApiForm({
    avatar: undefined as undefined | File
  })

  const updateProfile = async () => {
    await form.patch(
      '/my-profile',
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      },
      {
        onSucess() {}
      }
    )

    if (form.res) {
      console.log(form.res)

      // @ts-ignore
      dp.value = form.res.data?.avatar
    }
  }

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
