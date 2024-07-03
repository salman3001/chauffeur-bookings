import useApiForm from '../useApiForm'

export const useDeleteAllNotification = () => {
  const form = useApiForm({})

  const deleteAllNotification = (after?: () => void) =>
    form.delete(
      '/notifications/remove-all',
      {},
      {
        onSucess() {
          if (after) after()
        }
      }
    )

  return {
    deleteAllNotification
  }
}
