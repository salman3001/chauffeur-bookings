import type { Image } from '@/types/entities/Image'
import { onMounted, ref } from 'vue'
import useApiGet from '../useApiGet'

export const dp = ref<Image>()

export const useAvatar = () => {
  const { data, exec } = useApiGet<Image>()

  onMounted(async () => {
    await exec('/my-profile/avatar')

    if (data.value) {
      console.log(data.value)

      dp.value = data.value
    }
  })

  return {
    dp
  }
}
