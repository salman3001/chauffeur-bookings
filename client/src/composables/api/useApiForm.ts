import type { AxiosError, AxiosRequestConfig } from 'axios'
import { reactive, watch } from 'vue'
import vt from 'vue-toastification'
import type { ResType, ValidationErrorsArray } from '@/types/interfaces/ResType'
import api from '@/utils/axios'
import { pickKeysFromReference } from '@/utils/helpers'

export default function useApiForm<T extends object>(
  initialForm: T,
  options?: { disableToast?: boolean }
) {
  const formObject = reactive({
    ...initialForm,
    res: undefined as undefined | ResType<any>,
    processing: false,
    error: null as unknown as ValidationErrorsArray | undefined,
    disableToast: options?.disableToast || false,
    async post(
      url: string,
      config?: AxiosRequestConfig,
      opt?: { onSucess?: () => void; onError?: () => void }
    ) {
      this.error = undefined
      this.processing = true
      try {
        const res = await api.post<ResType<any>>(
          url,
          pickKeysFromReference(this, initialForm),
          config
        )
        if (res.data.success === true) {
          opt?.onSucess && opt.onSucess()
        }
        this.res = res.data
      } catch (error: unknown) {
        this.res = (error as AxiosError<ResType<any>>).response?.data
        this.error = (error as AxiosError<ResType<any>>).response?.data?.errors
        opt?.onError && opt.onError()
      }
      this.processing = false
    },
    async put(
      url: string,
      config?: AxiosRequestConfig,
      opt?: { onSucess?: () => void; onError?: () => void }
    ) {
      this.error = undefined
      this.processing = true
      try {
        const res = await api.put<ResType<any>>(
          url,
          pickKeysFromReference(this, initialForm),
          config
        )
        if (res.data.success === true) {
          opt?.onSucess && opt.onSucess()
        }
        this.res = res.data
      } catch (error: unknown) {
        this.res = (error as AxiosError<ResType<any>>).response?.data
        this.error = (error as AxiosError<ResType<any>>).response?.data?.errors
        opt?.onError && opt.onError()
      }
      this.processing = false
    },
    async delete(
      url: string,
      config?: AxiosRequestConfig,
      opt?: { onSucess?: () => void; onError?: () => void }
    ) {
      this.error = undefined
      this.processing = true
      try {
        const res = await api.delete<ResType<any>>(url, config)
        if (res.data.success === true) {
          opt?.onSucess && opt.onSucess()
        }
        this.res = res.data
      } catch (error: unknown) {
        this.res = (error as AxiosError<ResType<any>>).response?.data
        this.error = (error as AxiosError<ResType<any>>).response?.data?.errors
        opt?.onError && opt.onError()
      }
      this.processing = false
    }
  })

  watch(
    () => formObject.res,
    (n) => {
      if (n && !formObject.disableToast) {
        const toast = vt.useToast()
        if (n.success === true) {
          toast.success(n.message || ' Success')
        }
        if (n.success === false) {
          toast.error(n.message || 'Error')
        }
      }
    }
  )

  return formObject
}
