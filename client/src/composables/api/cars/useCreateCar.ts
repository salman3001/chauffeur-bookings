import useApiForm from '../useApiForm'
import { useRouter } from 'vue-router'

export const useCreateCar = () => {
  const router = useRouter()

  const form = useApiForm({
    name: '',
    make: '',
    year: 2024,
    image: undefined as File | undefined
  })

  const createCar = () =>
    form.post(
      '/cars',
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

  return {
    form,
    createCar
  }
}
