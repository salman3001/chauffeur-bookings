import type { AxiosError, AxiosRequestConfig } from 'axios'
import { reactive, watch } from 'vue'
import { useToast } from 'vue-toastification'
import type { ResType, ValidationErrorObj } from '@/types/interfaces/ResType'
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
    errors: null as unknown as ValidationErrorObj | undefined,
    disableToast: options?.disableToast || false,
    async post(
      url: string,
      config?: AxiosRequestConfig,
      opt?: { onSucess?: () => void; onError?: () => void }
    ) {
      this.errors = undefined
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
        this.errors = (error as AxiosError<ResType<any>>).response?.data?.errors
        opt?.onError && opt.onError()
      }
      this.processing = false
    },
    async pacth(
      url: string,
      config?: AxiosRequestConfig,
      opt?: { onSucess?: () => void; onError?: () => void }
    ) {
      this.errors = undefined
      this.processing = true
      try {
        const res = await api.patch<ResType<any>>(
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
        this.errors = (error as AxiosError<ResType<any>>).response?.data?.errors
        opt?.onError && opt.onError()
      }
      this.processing = false
    },
    async delete(
      url: string,
      config?: AxiosRequestConfig,
      opt?: { onSucess?: () => void; onError?: () => void }
    ) {
      this.errors = undefined
      this.processing = true
      try {
        const res = await api.delete<ResType<any>>(url, config)
        if (res.data.success === true) {
          opt?.onSucess && opt.onSucess()
        }
        this.res = res.data
      } catch (error: unknown) {
        this.res = (error as AxiosError<ResType<any>>).response?.data
        this.errors = (error as AxiosError<ResType<any>>).response?.data?.errors
        opt?.onError && opt.onError()
      }
      this.processing = false
    },
    reset() {
      for (const key in initialForm) {
        // @ts-ignore
        this[key] = initialForm[key]
      }
      this.res = undefined
      this.processing = false
      this.errors = null
    }
  })

  watch(
    () => formObject.res,
    (n) => {
      if (n && !formObject.disableToast) {
        const toast = useToast()
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
