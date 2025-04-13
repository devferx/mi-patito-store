import { getDuckColorDetails } from '@/utils/get-duck-color-label'

import type { DuckColor } from '@/models/duck'

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
