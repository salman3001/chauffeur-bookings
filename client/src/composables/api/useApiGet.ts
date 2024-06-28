import type { ResType } from '@/types/interfaces/ResType'
import api from '@/utils/axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { ref, type Ref } from 'vue'
import vt from 'vue-toastification'

export default function useApiGet<T>() {
  const processing = ref(false)
  const data = ref<T | null>(null)

  const error = ref<null | string | undefined>(null)

  const exec = async (
    url: string,
    config?: AxiosRequestConfig,
    opt?: { onSuccess?: () => void; onError?: () => void }
  ) => {
    processing.value = true
    error.value = null
    api
      .get<ResType<any>>(url, config)
      .then((res) => {
        data.value = res.data.data
        processing.value = false
        if (res.data.success === true) {
          opt?.onSuccess && opt?.onSuccess()
        }
      })
      .catch((err: AxiosError<ResType<T>>) => {
        const resData = err.response?.data
        error.value = resData?.message

        if (resData?.success === false) {
          opt?.onError && opt?.onError()
          if (!import.meta.env.SSR) {
            const toast = vt.useToast()
            toast.error(resData?.message || 'Error Resposse')
          }
        }
      })
  }

  return {
    data: data as Ref<T>,
    exec,
    processing,
    error
  }
}
