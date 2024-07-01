import useApiForm from '../useApiForm'
import { useRouter } from 'vue-router'

export const useCreateCar = () => {
  const router = useRouter()

  const form = useApiForm({
    name: '',
    make: '',
    year: 2024,
    image: undefined
  })

  const createCar = () =>
    form.post(
      '/cars',
      {},
      {
        onSucess() {
          router.push({ name: 'Cars.Index' })
        }
      }
    )

  return {
    form,
    createCar
  }
}
