import { useCreateDuck } from '@ducks/hooks/use-create-duck'
import { DuckForm } from '@ducks/components/duck-form'

const CreateDuckPage = () => {
  const { createDuckMutation, handleSubmit } = useCreateDuck()
  const { isPending: isLoading } = createDuckMutation

  return (
    <section className="wrapper">
      <DuckForm isLoading={isLoading} onSubmit={handleSubmit} />
    </section>
  )
}

export default CreateDuckPage
