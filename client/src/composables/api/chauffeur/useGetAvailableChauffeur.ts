import type { User } from '@/types/entities/user'
import useApiGet from '../useApiGet'
import { reactive } from 'vue'

export const useGetAvailableChauffeur = () => {
  const { data, processing, exec, errors } = useApiGet<User[]>()

  const initialQuery = {
    dateTime: new Date(),
    duration: 2
  }

  const query = reactive(initialQuery)

  const getAvailableChauffeur = () =>
    exec('/users/chauffeurs/availabilty', {
      params: { ...query, dateTime: new Date(query.dateTime) }
    })

  return {
    data,
    query,
    processing,
    getAvailableChauffeur,
    errors
  }
}
