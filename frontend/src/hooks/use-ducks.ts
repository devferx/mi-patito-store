import { useQuery } from '@tanstack/react-query'

import { getAllDucks } from '@/services/ducks.service'

export const useDucks = () => {
  const getDucksQuery = useQuery({
    queryKey: ['ducks'],
    queryFn: getAllDucks,
  })

  return { getDucksQuery }
}
