import { Plus } from 'lucide-react'
import { Link } from 'react-router'

import { useDucks } from '@/hooks/use-ducks'

import { DucksTable } from '@/components/ducks-table/ducks-table'
import { ducksTableColumns } from '@/components/ducks-table/ducks-table-columns'
import { HomeHeader } from '@/components/home-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const HomePage = () => {
  const { getDucksQuery, totalDucks, totalTypes } = useDucks()
  const { data } = getDucksQuery

  return (
    <section className="wrapper">
      <HomeHeader totalDucks={totalDucks} totalTypes={totalTypes} />

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

export default HomePage
