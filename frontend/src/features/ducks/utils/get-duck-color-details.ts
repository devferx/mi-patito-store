import { DUCK_COLOR_DETAILS, type DuckColor } from '@ducks/constants/ducks'

export function getDuckColorDetails(duckColor: DuckColor) {
  return DUCK_COLOR_DETAILS[duckColor]
}
