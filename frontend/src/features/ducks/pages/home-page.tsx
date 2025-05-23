import { Plus } from 'lucide-react'
import { Link } from 'react-router'

import { useDucks } from '@ducks/hooks/use-ducks'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardHeader } from '@/features/ducks/components/dashboard-header/dashboard-header'
import { DucksTable } from '@ducks/components/ducks-table/ducks-table'
import { ducksTableColumns } from '@ducks/components/ducks-table/ducks-table-columns'

const HomePage = () => {
  const { getDucksQuery, totalDucks, totalTypes } = useDucks()
  const { data } = getDucksQuery

  return (
    <section className="wrapper">
      <DashboardHeader totalDucks={totalDucks} totalTypes={totalTypes} />

      <Card className="mx-auto mt-10 pb-0">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-2xl font-bold">Duck Inventory</CardTitle>
            <div className="flex gap-1">
              <Button asChild>
                <Link to="/create-duck">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Duck
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
