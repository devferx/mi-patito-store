import { useParams } from 'react-router'

import { useEditDuck } from '@/hooks/use-edit-duck'

import { DuckForm } from '@/components/duck-form'

import { DuckFormValues } from '@/schemas/duck-form.schema'

export const EditDuckPage = () => {
  const { id } = useParams<{ id: string }>()

  const { duck, editDuckMutation, handleSubmit } = useEditDuck(id)
  const { isPending: isLoading } = editDuckMutation

  const handleFormSubmit = (formData: DuckFormValues) => {
    if (!id) return

    const editData = {
      price: formData.price,
      quantity: formData.quantity,
    }

    handleSubmit(id, editData)
  }

  if (!duck) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl">Cargando...</h2>
      </div>
    )
  }

  return (
    <main>
      <section className="container mx-auto py-20">
        <DuckForm
          isEditing={true}
          duck={duck}
          isLoading={isLoading}
          onSubmit={handleFormSubmit}
        />
      </section>
    </main>
  )
}
