import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateDuck } from '@ducks/services/ducks.service'

import { useDucks } from '@ducks/hooks/use-ducks'

import type { Duck } from '@/models/duck'
import type { DuckFormValues } from '@ducks/schemas/duck-form.schema'

interface EditDuckParams {
  id: string
  data: Partial<DuckFormValues>
}

export const useEditDuck = (id: string | undefined) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { getDucksQuery } = useDucks()
  const { data: allDucks } = getDucksQuery

  const [duck, setDuck] = useState<Duck | undefined>(undefined)

  // Find the duck by id and set it to the state
  // If the duck is not found, navigate to home
  useEffect(() => {
    if (!id) return
    if (!allDucks) return

    const foundDuck = allDucks.find((duck) => duck.id.toString() === id)

    if (!foundDuck) {
      navigate('/')
      return
    }

    setDuck(foundDuck)
  }, [id, allDucks, navigate])

  const editDuckMutation = useMutation({
    mutationFn: ({ id, data }: EditDuckParams) => updateDuck(id, data),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ['ducks'] })
      toast.success(message)
      navigate('/')
    },
  })

  const handleSubmit = (id: string, data: Partial<DuckFormValues>) => {
    editDuckMutation.mutate({ id, data })
  }

  return {
    duck,
    editDuckMutation,
    handleSubmit,
  }
}
