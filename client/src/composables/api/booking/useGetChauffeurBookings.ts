import useApiGet from '../useApiGet'
import { reactive, ref } from 'vue'
import type { Paginated } from '@/types/interfaces/ResType'
import { debouncedWatch } from '@vueuse/core'
import type { Booking } from '@/types/entities/booking'

export const useGetChauffeurBookings = () => {
  const { data, processing, exec } = useApiGet<Paginated<Booking[]>>()

  const initialQuery = {
    page: 1,
    perPage: 10,
    orderBy: [],
    search: ''
  }

  const debouncedSearch = ref('')

  const query = reactive(initialQuery)

  const getChauffeurBookings = () =>
    exec('/bookings/chauffeur', {
      params: query
    })

  const refresh = () => {
    Object.keys(initialQuery).forEach((key) => {
      // @ts-ignore
      query[key] = initialQuery[key]
    })
    getChauffeurBookings()
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
    getChauffeurBookings,
    processing,
    refresh,
    debouncedSearch
  }
}
