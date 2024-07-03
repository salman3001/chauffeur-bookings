import useApiGet from '../useApiGet'
import { reactive, ref } from 'vue'
import type { Paginated } from '@/types/interfaces/ResType'
import { debouncedWatch } from '@vueuse/core'
import type { Notification } from '@/types/entities/notification'

export const useGetNotifications = () => {
  const { data, processing, exec } = useApiGet<Paginated<Notification[]>>()

  const initialQuery = {
    page: 1,
    perPage: 10,
    orderBy: [],
    search: ''
  }

  const debouncedSearch = ref('')

  const query = reactive(initialQuery)

  const getNotifications = () =>
    exec('/notifications', {
      params: query
    })

  const refresh = () => {
    Object.keys(initialQuery).forEach((key) => {
      // @ts-ignore
      query[key] = initialQuery[key]
    })
    getNotifications()
  }

  debouncedWatch(
    debouncedSearch,
    () => {
      query.search = debouncedSearch.value
    },
    { debounce: 500 }
  )

  return {
    data: data,
    query,
    getNotifications,
    processing,
    refresh,
    debouncedSearch
  }
}
