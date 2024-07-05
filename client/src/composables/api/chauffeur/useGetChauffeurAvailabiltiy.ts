import useApiGet from '../useApiGet'
import { reactive } from 'vue'

export const useGetChauffeurAvailabiltiy = () => {
  const { data, processing, exec } = useApiGet<boolean>()

  const initialQuery = {
    dateTime: new Date(),
    duration: 2
  }

  const query = reactive(initialQuery)

  const getChauffeurAvailabiltiy = (id: number) =>
    exec(`/users/chauffeurs/${id}/availabilty`, {
      params: query
    })

  return {
    data,
    query,
    processing,
    getChauffeurAvailabiltiy
  }
}
