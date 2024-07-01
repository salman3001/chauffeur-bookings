import useApiForm from '../useApiForm'

export const useDeleteUser = () => {
  const form = useApiForm({})

  const deleteUser = (id: number, onDelete: () => void) =>
    form.delete(
      `users/${id}/`,
      {},
      {
        onSucess() {
          onDelete()
        }
      }
    )

  return {
    deleteUser
  }
}
