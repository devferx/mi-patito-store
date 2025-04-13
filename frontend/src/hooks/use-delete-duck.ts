import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteDuck } from '@/services/ducks.service'

export const useDeleteDuck = () => {
  const queryClient = useQueryClient()

  const deleteDuckMutation = useMutation({
    mutationFn: deleteDuck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ducks'] })
    },
  })

  const handleDelete = (id: string) => {
    deleteDuckMutation.mutate(id)
  }

  return {
    deleteDuckMutation,
    handleDelete,
  }
}
