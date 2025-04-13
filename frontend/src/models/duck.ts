import { DuckColor, DuckSize } from '@/constants/ducks'

export interface Duck {
  id: number
  color: DuckColor
  size: DuckSize
  price: number
  quantity: number
}
