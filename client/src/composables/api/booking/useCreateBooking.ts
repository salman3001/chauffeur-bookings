import useApiForm from '../useApiForm'
import { useRoute, useRouter } from 'vue-router'
import useApiGet from '../useApiGet'
import type { User } from '@/types/entities/user'
import { onMounted } from 'vue'

export const useCreateBooking = () => {
  const router = useRouter()
  const route = useRoute()
  const { chauffeurId, dateTime, duration } = route.params as Record<string, any>

  const { data: chauffeur, exec: getCuaffeur } = useApiGet<User>()

  const form = useApiForm({
    pickupAddress: '',
    pickupCords: {
      x: '',
      y: ''
    },
    dropoffAddress: '',
    dropoffCords: {
      x: '',
      y: ''
    },
    bookedForHours: Number(duration),
    paymentMode: 'online',
    chauffeurId: Number(chauffeurId),
    pickupDateTime: dateTime
  })

  const createBooking = () =>
    form.post(
      '/bookings',
      {},
      {
        onSucess() {
          router.push({ name: 'Bookings' })
        }
      }
    )

  onMounted(() => {
    getCuaffeur(`/users/${chauffeurId}`)
  })

  return {
    form,
    chauffeur,
    createBooking
  }
}
