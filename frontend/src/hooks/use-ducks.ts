import { useQuery } from '@tanstack/react-query'

import { getAllDucks } from '@/services/ducks.service'

export const useDucks = () => {
  const getDucksQuery = useQuery({
    queryKey: ['ducks'],
    queryFn: getAllDucks,
  })

  const totalDucks =
    getDucksQuery.data?.reduce((acc, duck) => acc + (duck.quantity ?? 0), 0) ??
    0
  const totalTypes = getDucksQuery.data?.length ?? 0

  return { getDucksQuery, totalDucks, totalTypes }
}
