import useApiForm from '../useApiForm'

export const useDeleteCar = () => {
  const form = useApiForm({})

  const deleteCar = (id: number, onDelete: () => void) =>
    form.delete(
      `cars/${id}/`,
      {},
      {
        onSucess() {
          onDelete()
        }
      }
    )

  return {
    deleteCar
  }
}
