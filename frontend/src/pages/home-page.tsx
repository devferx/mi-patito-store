import { useDucks } from '@/hooks/use-ducks'

export const HomePage = () => {
  const { getDucksQuery } = useDucks()
  const { data } = getDucksQuery

  return (
    <main>
      <section className="container mx-auto py-20">
        <h2 className="text-center text-3xl font-bold">Almacen de Patitos</h2>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </section>
    </main>
  )
}
