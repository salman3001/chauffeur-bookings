import useApiGet from '../useApiGet'
import { reactive, ref } from 'vue'
import type { Paginated } from '@/types/interfaces/ResType'
import type { Car } from '@/types/entities/car'
import { debouncedWatch } from '@vueuse/core'

export const useGetCars = () => {
  const { data, processing, exec } = useApiGet<Paginated<Car[]>>()

  const initialQuery = {
    page: 1,
    perPage: 10,
    orderBy: [],
    search: ''
  }

  const debouncedSearch = ref('')

  const query = reactive(initialQuery)

  const getCars = () =>
    exec('/cars', {
      params: query
    })

  const refresh = () => {
    Object.keys(initialQuery).forEach((key) => {
      // @ts-ignore
      query[key] = initialQuery[key]
    })
    getCars()
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
    getCars,
    processing,
    refresh,
    debouncedSearch
  }
}
