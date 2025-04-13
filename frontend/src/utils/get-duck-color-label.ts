import type { DuckColor } from '@/models/duck'

const colorDetails: Record<DuckColor, { label: string; color: string }> = {
  Black: { label: 'Negro', color: '#171717' },
  Yellow: { label: 'Amarillo', color: '#eab308' },
  Green: { label: 'Verde', color: '#22c55e' },
  Red: { label: 'Rojo', color: '#ef4444' },
}

export function getDuckColorDetails(duckColor: DuckColor) {
  return colorDetails[duckColor]
}
