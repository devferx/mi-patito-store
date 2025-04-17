import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { InputField } from '@/components/shared/input-field'
import { SelectField } from '@/components/shared/select-field'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form'

import {
  DUCK_COLOR_DETAILS,
  DUCK_COLORS,
  DUCK_SIZES,
} from '@/features/ducks/constants/ducks'

import {
  duckFormSchema,
  type DuckFormValues,
} from '@/features/ducks/schemas/duck-form.schema'

import type { Duck } from '@/models/duck'

interface Props {
  duck?: Duck
  isLoading?: boolean
  isEditing?: boolean
  onSubmit?: (values: DuckFormValues) => void
}

export const DuckForm = ({
  duck,
  isLoading,
  isEditing = false,
  onSubmit = () => {},
}: Props) => {
  const navigate = useNavigate()

  const form = useForm<DuckFormValues>({
    resolver: zodResolver(duckFormSchema),
    defaultValues: {
      color: duck?.color,
      size: duck?.size,
      price: duck?.price,
      quantity: duck?.quantity,
    },
  })

  const handleBack = () => {
    navigate(-1)
  }

  const handleSubmit = (data: DuckFormValues) => {
    onSubmit(data)
  }

  const sizesOptions = DUCK_SIZES.map((size) => ({
    label: size,
    value: size,
  }))
  const colorsOptions = DUCK_COLORS.map((color) => ({
    label: DUCK_COLOR_DETAILS[color].label,
    value: color,
  }))

  return (
    <Card className="mx-auto w-[400px]">
      <CardHeader className="flex items-center gap-4">
        <Button
          className="cursor-pointer"
          variant="outline"
          size="icon"
          onClick={handleBack}
        >
          <ChevronLeft />
        </Button>

        <CardTitle className="text-xl">
          {isEditing ? 'Editar patito' : 'Agregar nuevo patito'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid w-full items-center gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <SelectField
              control={form.control}
              name="color"
              label="Color"
              placeholder="Seleccionar color"
              options={colorsOptions}
            />

            <SelectField
              control={form.control}
              name="size"
              label="Tamaño"
              placeholder="Seleccionar tamaño"
              options={sizesOptions}
            />

            <InputField
              control={form.control}
              name="price"
              label="Precio (USD)"
              placeholder="Ejm.: 21.25"
              type="number"
              step={0.01}
            />

            <InputField
              control={form.control}
              name="quantity"
              label="Cantidad"
              placeholder="Ejm.: 15"
              type="number"
            />

            <CardFooter className="flex justify-end px-0 pb-0">
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={isLoading}
              >
                {isEditing ? 'Actualizar' : 'Agregar'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
