import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { createDuck } from '@/services/ducks.service'

import type { DuckFormValues } from '@/schemas/duck-form.schema'

export const useCreateDuck = () => {
  const navigate = useNavigate()

  const createDuckMutation = useMutation({
    mutationFn: createDuck,
    onSuccess: () => {
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
