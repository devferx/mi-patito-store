import type { Duck } from '@/models/duck'

export type CreateDuckDto = Omit<Duck, 'id'>
export type UpdateDuckDto = Partial<CreateDuckDto>
