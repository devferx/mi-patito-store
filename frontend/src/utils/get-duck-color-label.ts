import type { DuckColor } from '@/models/duck'

const colors: Record<DuckColor, string> = {
  Black: 'Negro',
  Yellow: 'Amarillo',
  Green: 'Verde',
  Red: 'Rojo',
}

export function getDuckColorLabel(duckColor: DuckColor): string {
  return colors[duckColor]
}
