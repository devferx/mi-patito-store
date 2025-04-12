import { Button } from './components/ui/button'

export const App = () => {
  return (
    <main>
      <section className="container mx-auto py-20">
        <h2 className="text-center text-3xl font-bold">Almacen de Patitos</h2>
        <div className="mt-5 flex flex-col items-center justify-center">
          <Button>Click me</Button>
        </div>
      </section>
    </main>
  )
}
