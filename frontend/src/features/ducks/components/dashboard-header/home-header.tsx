import { Badge } from '@/components/ui/badge'
import { StatCard } from './stat-card'

import { DUCK_COLOR_DETAILS } from '@ducks/constants/ducks'

interface HomeHeaderProps {
  totalDucks?: number
  totalTypes?: number
}

export const HomeHeader = ({
  totalDucks = 0,
  totalTypes = 0,
}: HomeHeaderProps) => {
  const duckColorDetails = Object.values(DUCK_COLOR_DETAILS)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard title="Total de Patitos en almacen" value={totalDucks} />
      <StatCard title="Tipos de Patitos" value={totalTypes} />
      <StatCard
        title="Colores Disponibles"
        value={
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
        }
      />
    </div>
  )
}
