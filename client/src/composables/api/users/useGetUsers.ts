import type { User } from '@/types/interfaces/User'
import useApiGet from '../useApiGet'
import { reactive, watch } from 'vue'
import type { Paginated, ResType } from '@/types/interfaces/ResType'

export const useGetUsers = () => {
  const { data, processing, exec } = useApiGet<Paginated<any[]>>()

  const initialQuery = {
    page: 1,
    perPage: 10,
    sortBy: ''
  }

  const query = reactive(initialQuery)

  const getUsers = () =>
    exec('/users', {
      params: query
    })

  const refresh = () => {
    Object.keys(initialQuery).forEach((key) => {
      // @ts-ignore
      query[key] = initialQuery[key]
    })
    getUsers()
  }

  return {
    data: data,
    query,
    getUsers,
    processing,
    refresh
  }
}
