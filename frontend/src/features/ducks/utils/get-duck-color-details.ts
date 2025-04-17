import {
  DUCK_COLOR_DETAILS,
  type DuckColor,
} from '@/features/ducks/constants/ducks'

export function getDuckColorDetails(duckColor: DuckColor) {
  return DUCK_COLOR_DETAILS[duckColor]
}
