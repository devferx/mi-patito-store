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
  Black: { label: 'Black', color: '#171717' },
  Yellow: { label: 'Yellow', color: '#eab308' },
  Green: { label: 'Green', color: '#22c55e' },
  Red: { label: 'Red', color: '#ef4444' },
}

export const DUCK_SIZE_LABELS: Record<DuckSize, string> = {
  XLarge: 'XLarge',
  Large: 'Large',
  Medium: 'Medium',
  Small: 'Small',
  XSmall: 'XSmall',
}
