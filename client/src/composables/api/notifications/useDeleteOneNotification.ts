import useApiForm from '../useApiForm'

export const useDeleteOneNotification = () => {
  const form = useApiForm({})

  const deleteOneNotification = (id: number, after?: () => void) =>
    form.delete(
      `/notifications/${id}`,
      {},
      {
        onSucess() {
          if (after) after()
        }
      }
    )

  return {
    deleteOneNotification
  }
}
