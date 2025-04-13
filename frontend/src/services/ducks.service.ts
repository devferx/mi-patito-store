import { api } from './api.service'

import type { Duck } from '@/models/duck'
import type { GetAllDucksResponse } from '@/interfaces/get-all-ducks-response'
import type { CreateDuckResponse } from '@/interfaces/create-duck-response'
import type { EditDuckResponse } from '@/interfaces/edit-duck-response'

export const getAllDucks = async (): Promise<Duck[]> => {
  const { data } = await api.get<GetAllDucksResponse>('/ducks')
  const { data: ducks } = data
  return ducks
}

export const createDuck = async (duck: Omit<Duck, 'id'>): Promise<Duck> => {
  const { data } = await api.post<CreateDuckResponse>('/ducks', duck)
  const { data: newDuck } = data
  return newDuck
}

export const updateDuck = async (
  id: string,
  duck: Partial<Omit<Duck, 'id'>>,
): Promise<Duck> => {
  const { data } = await api.put<EditDuckResponse>(`/ducks/${id}`, duck)
  const { data: updatedDuck } = data
  return updatedDuck
}

// TODO: Update the return type
export const deleteDuck = async (id: string): Promise<void> => {
  await api.delete(`/ducks/${id}`)
}
