import type { Duck } from '@/models/duck'
import type { ServerResponse } from './server-response'

export interface GetAllDucksResponse extends ServerResponse {
  data: Duck[]
}
