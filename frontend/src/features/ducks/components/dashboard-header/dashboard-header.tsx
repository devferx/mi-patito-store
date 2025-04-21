import { Badge } from '@/components/ui/badge'
import { StatCard } from './stat-card'

import { DUCK_COLOR_DETAILS } from '@ducks/constants/ducks'

interface Props {
  totalDucks?: number
  totalTypes?: number
}

export const DashboardHeader = ({ totalDucks = 0, totalTypes = 0 }: Props) => {
  const duckColorDetails = Object.values(DUCK_COLOR_DETAILS)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard title="Total Ducks in Stock">{totalDucks}</StatCard>
      <StatCard title="Duck Types">{totalTypes}</StatCard>
      <StatCard title="Available Colors">
        <div className="flex flex-wrap gap-2">
          {duckColorDetails.map(({ color, label }) => (
            <Badge
              key={color}
              className="flex items-center gap-1.5"
              variant="outline"
            >
              <div
                className={'h-3 w-3 rounded-full'}
                style={{ background: color }}
              />
              {label}
            </Badge>
          ))}
        </div>
      </StatCard>
    </div>
  )
}
