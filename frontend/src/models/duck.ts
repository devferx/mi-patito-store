export interface Duck {
  id: number
  color: DuckColor
  size: DuckSize
  price: number
  quantity: number
}

export type DuckColor = 'Red' | 'Green' | 'Yellow' | 'Black'
export type DuckSize = 'XLarge' | 'Large' | 'Medium' | 'Small' | 'XSmall'
