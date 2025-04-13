import { useCreateDuck } from '@/hooks/use-create-duck'
import { DuckForm } from '@/components/duck-form'

export const CreateDuckPage = () => {
  const { createDuckMutation, handleSubmit } = useCreateDuck()
  const { isPending: isLoading } = createDuckMutation

  return (
    <main>
      <section className="container mx-auto py-20">
        <DuckForm isLoading={isLoading} onSubmit={handleSubmit} />
      </section>
    </main>
  )
}
