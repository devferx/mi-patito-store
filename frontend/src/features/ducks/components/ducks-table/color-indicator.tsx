import { getDuckColorDetails } from '@ducks/utils/get-duck-color-details'

import type { DuckColor } from '@ducks/constants/ducks'

interface Props {
  duckColor: DuckColor
}

export const ColorIndicator = ({ duckColor }: Props) => {
  const { color, label } = getDuckColorDetails(duckColor)

  return (
    <div className="flex items-center gap-2">
      <div
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  )
}
