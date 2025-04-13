import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateDuck } from '@/services/ducks.service'

import { useDucks } from '@/hooks/use-ducks'

import type { Duck } from '@/models/duck'
import type { DuckFormValues } from '@/schemas/duck-form.schema'

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ducks'] })
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
