export const DUCK_COLORS = ['Red', 'Green', 'Yellow', 'Black'] as const
export type DuckColor = (typeof DUCK_COLORS)[number]

export const DUCK_SIZES = [
  'XLarge',
  'Large',
  'Medium',
  'Small',
  'XSmall',
] as const
export type DuckSize = (typeof DUCK_SIZES)[number]

export const DUCK_COLOR_DETAILS: Record<
  DuckColor,
  { label: string; color: string }
> = {
  Black: { label: 'Negro', color: '#171717' },
  Yellow: { label: 'Amarillo', color: '#eab308' },
  Green: { label: 'Verde', color: '#22c55e' },
  Red: { label: 'Rojo', color: '#ef4444' },
}

export const DUCK_SIZE_LABELS: Record<DuckSize, string> = {
  XLarge: 'XLarge',
  Large: 'Large',
  Medium: 'Medium',
  Small: 'Small',
  XSmall: 'XSmall',
}
