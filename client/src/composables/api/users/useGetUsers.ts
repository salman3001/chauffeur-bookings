import type { User } from '@/types/interfaces/User'
import useApiGet from '../useApiGet'
import { reactive, watch } from 'vue'
import type { Paginated, ResType } from '@/types/interfaces/ResType'

export const useGetUsers = () => {
  const { data, processing, exec } = useApiGet<Paginated<any[]>>()

  const query = reactive({
    page: 1,
    perPage: 2
  })

  const getUsers = () =>
    exec('/users', {
      params: query
    })
  watch(data, () => {
    console.log(data.value)
  })

  return {
    data: data,
    query,
    getUsers,
    processing
  }
}
