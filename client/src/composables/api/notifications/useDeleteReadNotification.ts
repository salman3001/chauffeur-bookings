import useApiForm from '../useApiForm'

export const useDeleteReadNotifications = () => {
  const form = useApiForm({})

  const deleteReadNotifications = (after?: () => void) =>
    form.delete(
      '/notifications/remove-read',
      {},
      {
        onSucess() {
          if (after) after()
        }
      }
    )

  return {
    deleteReadNotifications
  }
}
