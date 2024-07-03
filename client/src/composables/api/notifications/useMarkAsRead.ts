import useApiForm from '../useApiForm'

export const useMarkAsRead = () => {
  const form = useApiForm({})

  const markAsRead = (id: number, after?: () => void) =>
    form.patch(
      `/notifications/${id}/mark-as-read`,
      {},
      {
        onSucess() {
          if (after) after()
        }
      }
    )

  return {
    markAsRead
  }
}
