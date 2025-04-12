import { Duck } from '@/models/duck'

export interface GetAllDucksResponse {
  ok: boolean
  message: string
  data: Duck[]
}
