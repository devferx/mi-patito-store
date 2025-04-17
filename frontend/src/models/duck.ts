import { DuckColor, DuckSize } from '@ducks/constants/ducks'

export interface Duck {
  id: number
  color: DuckColor
  size: DuckSize
  price: number
  quantity: number
}
