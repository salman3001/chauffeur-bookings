import type { ResType } from '@/types/interfaces/ResType'
import api from '@/utils/axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { ref, type Ref } from 'vue'
import { useToast } from 'vue-toastification'

export default function useApiGet<T>() {
  const processing = ref(false)
  const data = ref<T>()

  const error = ref<string | undefined>()

  const exec = async (
    url: string,
    config?: AxiosRequestConfig,
    opt?: { onSuccess?: () => void; onError?: () => void }
  ) => {
    processing.value = true
    error.value = undefined

    try {
      data.value = undefined
      const res = await api.get<ResType<any>>(url, config)
      data.value = res.data.data
      processing.value = false
      if (res.data.success === true) {
        opt?.onSuccess && opt?.onSuccess()
      }
    } catch (err) {
      const resData = (err as AxiosError<ResType<T>>).response?.data
      processing.value = false
      error.value = resData?.message

      if (resData?.success === false) {
        opt?.onError && opt?.onError()
        if (!import.meta.env.SSR) {
          const toast = useToast()
          toast.error(resData?.message || 'Error Resposse')
        }
      }
    }
  }

  return {
    data,
    exec,
    processing,
    error
  }
}
