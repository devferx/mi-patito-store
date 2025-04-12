import { api } from './api.service'

import type { Duck } from '@/models/duck'
import type { GetAllDucksResponse } from '@/interfaces/get-all-ducks-response'
import type { CreateDuckResponse } from '@/interfaces/create-duck-response'

export const getAllDucks = async () => {
  const { data } = await api.get<GetAllDucksResponse>('/ducks')
  const { data: ducks } = data
  return ducks
}

export const createDuck = async (duck: Omit<Duck, 'id'>) => {
  const { data } = await api.post<CreateDuckResponse>('/ducks', duck)
  const { data: newDuck } = data
  return newDuck
}
