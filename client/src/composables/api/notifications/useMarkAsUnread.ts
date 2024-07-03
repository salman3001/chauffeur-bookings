import useApiForm from '../useApiForm'

export const useMarkAsUnread = () => {
  const form = useApiForm({})

  const markAsUnread = (id: number, after?: () => void) =>
    form.patch(
      `/notifications/${id}/mark-as-unread`,
      {},
      {
        onSucess() {
          if (after) after()
        }
      }
    )

  return {
    markAsUnread
  }
}
