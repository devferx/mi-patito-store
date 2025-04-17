import { useQuery } from '@tanstack/react-query'

import { getDucks } from '@/features/ducks/services/ducks.service'

export const useDucks = () => {
  const getDucksQuery = useQuery({
    queryKey: ['ducks'],
    queryFn: getDucks,
  })

  const totalDucks =
    getDucksQuery.data?.reduce((acc, duck) => acc + (duck.quantity ?? 0), 0) ??
    0
  const totalTypes = getDucksQuery.data?.length ?? 0

  return { getDucksQuery, totalDucks, totalTypes }
}
