import type { Duck } from '@/models/duck'
import type { ServerResponse } from './server-response'

export interface CreateDuckResponse extends ServerResponse {
  data: Duck
}
