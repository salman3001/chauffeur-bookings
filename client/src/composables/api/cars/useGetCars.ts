import useApiGet from '../useApiGet'
import { reactive } from 'vue'
import type { Paginated } from '@/types/interfaces/ResType'
import type { Car } from '@/types/entities/car'

export const useGetCars = () => {
  const { data, processing, exec } = useApiGet<Paginated<Car[]>>()

  const initialQuery = {
    page: 1,
    perPage: 10,
    sortBy: ''
  }

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

  return {
    data: data,
    query,
    getCars,
    processing,
    refresh
  }
}
