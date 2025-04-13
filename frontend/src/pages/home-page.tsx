import { useDucks } from '@/hooks/use-ducks'

import { ducksTableColumns } from '@/components/ducks-table/ducks-table-columns'
import { DucksTable } from '@/components/ducks-table/ducks-table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

export const HomePage = () => {
  const { getDucksQuery } = useDucks()
  const { data } = getDucksQuery

  return (
    <main>
      <section className="container mx-auto py-20">
        <h2 className="text-center text-3xl font-bold">Almacen de Patitos</h2>

        <div className="mx-auto mt-10 max-w-5xl">
          <Button asChild={true}>
            <Link to="/create-duck">Agregar patito</Link>
          </Button>

          <div className="mt-2">
            {data && data.length > 0 && (
              <DucksTable columns={ducksTableColumns} data={data} />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
