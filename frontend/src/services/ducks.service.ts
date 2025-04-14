import { api } from './api.service'

import type { Duck } from '@/models/duck'
import type { CreateDuckResponse } from '@/interfaces/create-duck-response'
import type { EditDuckResponse } from '@/interfaces/edit-duck-response'
import type { GetAllDucksResponse } from '@/interfaces/get-all-ducks-response'
import type { ServerResponse } from '@/interfaces/server-response'

export const getAllDucks = async (): Promise<Duck[]> => {
  const { data } = await api.get<GetAllDucksResponse>('/ducks')
  const { data: ducks } = data
  return ducks
}

export const createDuck = async (
  duck: Omit<Duck, 'id'>,
): Promise<CreateDuckResponse> => {
  const { data } = await api.post<CreateDuckResponse>('/ducks', duck)
  return data
}

export const updateDuck = async (
  id: string,
  duck: Partial<Omit<Duck, 'id'>>,
): Promise<EditDuckResponse> => {
  const { data } = await api.put<EditDuckResponse>(`/ducks/${id}`, duck)
  return data
}

export const deleteDuck = async (id: string): Promise<ServerResponse> => {
  const { data } = await api.delete<ServerResponse>(`/ducks/${id}`)
  return data
}
