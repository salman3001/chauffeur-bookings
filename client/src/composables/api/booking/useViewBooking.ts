import type { Booking } from '@/types/entities/booking'
import useApiGet from '../useApiGet'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

export const useViewBooking = () => {
  const route = useRoute()
  const { data, processing, exec } = useApiGet<Booking>()

  const viewBookings = () => exec(`/bookings/${route?.params?.id}`)

  const refresh = () => {
    viewBookings()
  }

  onMounted(() => {
    viewBookings()
  })

  return {
    data: data,
    viewBookings,
    refresh,
    processing
  }
}
