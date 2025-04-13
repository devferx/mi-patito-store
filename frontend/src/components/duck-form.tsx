import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { DUCK_COLOR_DETAILS, DUCK_COLORS, DUCK_SIZES } from '@/constants/ducks'

import { duckFormSchema, type DuckFormValues } from '@/schemas/duck-form.schema'

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
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isEditing}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      {DUCK_COLORS.map((color) => (
                        <SelectItem key={color} value={color}>
                          {DUCK_COLOR_DETAILS[color].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamaño</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isEditing}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar tamaño" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      {DUCK_SIZES.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ejm.: 21.25"
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ejm.: 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
