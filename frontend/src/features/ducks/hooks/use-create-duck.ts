import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { createDuck } from '@ducks/services/ducks.service'

import type { DuckFormValues } from '@ducks/schemas/duck-form.schema'

export const useCreateDuck = () => {
  const navigate = useNavigate()

  const createDuckMutation = useMutation({
    mutationFn: createDuck,
    onSuccess: ({ message }) => {
      toast.success(message)
      navigate('/')
    },
  })

  const handleSubmit = (newDuck: DuckFormValues) => {
    createDuckMutation.mutate(newDuck)
  }

  return {
    createDuckMutation,
    handleSubmit,
  }
}
