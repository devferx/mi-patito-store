import { api } from '@/services/api.service'

import type { Duck } from '@/models/duck'
import type { CreateDuckResponse } from '@/features/ducks/interfaces/create-duck-response'
import type { EditDuckResponse } from '@/features/ducks/interfaces/edit-duck-response'
import type { GetDucksResponse } from '@/features/ducks/interfaces/get-all-ducks-response'
import type { ServerResponse } from '@/features/ducks/interfaces/server-response'
import type { CreateDuckDto, UpdateDuckDto } from '../types/duck'

export const getDucks = async (): Promise<Duck[]> => {
  const { data } = await api.get<GetDucksResponse>('/ducks')
  const { data: ducks } = data
  return ducks
}

export const createDuck = async (
  duck: CreateDuckDto,
): Promise<CreateDuckResponse> => {
  const { data } = await api.post<CreateDuckResponse>('/ducks', duck)
  return data
}

export const updateDuck = async (
  id: string,
  duck: UpdateDuckDto,
): Promise<EditDuckResponse> => {
  const { data } = await api.put<EditDuckResponse>(`/ducks/${id}`, duck)
  return data
}

export const deleteDuck = async (id: string): Promise<ServerResponse> => {
  const { data } = await api.delete<ServerResponse>(`/ducks/${id}`)
  return data
}
