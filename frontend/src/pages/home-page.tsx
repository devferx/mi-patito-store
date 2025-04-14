import { Plus } from 'lucide-react'
import { Link } from 'react-router'

import { useDucks } from '@/hooks/use-ducks'

import { DucksTable } from '@/components/ducks-table/ducks-table'
import { ducksTableColumns } from '@/components/ducks-table/ducks-table-columns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { DUCK_COLOR_DETAILS } from '@/constants/ducks'

export const HomePage = () => {
  const { getDucksQuery } = useDucks()
  const { data } = getDucksQuery

  const totalDucks =
    data?.reduce((acc, duck) => acc + (duck.quantity ?? 0), 0) ?? 0
  const totalTypes = data?.length ?? 0

  const duckColorDetails = Object.values(DUCK_COLOR_DETAILS)

  return (
    <section className="wrapper">
      {/* Refactor cards section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="duck-shadow transition-transform duration-200 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total de Patitos en almacen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDucks}</div>
          </CardContent>
        </Card>
        <Card className="duck-shadow transition-transform duration-200 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Tipos de Patitos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTypes}</div>
          </CardContent>
        </Card>
        <Card className="duck-shadow transition-transform duration-200 hover:scale-105">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Colores Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>

      <Card className="mx-auto mt-10 pb-0">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-2xl font-bold">
              Almacen de Patitos
            </CardTitle>
            <div className="flex gap-1">
              <Button asChild>
                <Link to="/create-duck">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Patito
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {data && data.length > 0 && (
            <DucksTable columns={ducksTableColumns} data={data} />
          )}
        </CardContent>
      </Card>
    </section>
  )
}
