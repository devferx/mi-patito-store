import type { Duck } from '@/models/duck'
import type { ServerResponse } from './server-response'

export interface EditDuckResponse extends ServerResponse {
  data: Duck
}
