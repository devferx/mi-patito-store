import { Duck } from '@/models/duck'

export interface CreateDuckResponse {
  ok: boolean
  message: string
  data: Duck
}
