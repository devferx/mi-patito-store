import { useParams } from 'react-router'

import { useEditDuck } from '@ducks/hooks/use-edit-duck'

import { DuckForm } from '@ducks/components/duck-form'

import { DuckFormValues } from '@ducks/schemas/duck-form.schema'

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
      <section className="wrapper">
        <h2 className="text-2xl">Loading...</h2>
      </section>
    )
  }

  return (
    <section className="wrapper">
      <DuckForm
        isEditing={true}
        duck={duck}
        isLoading={isLoading}
        onSubmit={handleFormSubmit}
      />
    </section>
  )
}

export default EditDuckPage
