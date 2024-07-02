import useApiForm from '../useApiForm'
import { useRoute, useRouter } from 'vue-router'
import useApiGet from '../useApiGet'
import { onMounted } from 'vue'
import type { Car } from '@/types/entities/car'

export const useEditCar = () => {
  const route = useRoute()
  const { data: car, exec } = useApiGet<Car>()

  const router = useRouter()

  const form = useApiForm({
    name: '',
    make: '',
    year: 2024,
    image: undefined as File | undefined
  })

  const createCar = () =>
    form.patch(
      `cars/${route.params.id}/`,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      },
      {
        onSucess() {
          router.push({ name: 'Cars.Index' })
        }
      }
    )

  onMounted(async () => {
    await exec(`/cars/${route.params.id}`)
    if (car.value) {
      form.assign(car.value)
    }
  })

  return {
    form,
    createCar,
    car
  }
}
