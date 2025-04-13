import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { duckFormSchema, DuckFormValues } from '@/schemas/duck-form.schema'
import { DUCK_COLORS, DUCK_COLOR_DETAILS, DUCK_SIZES } from '@/constants/ducks'

export const DuckForm = () => {
  const form = useForm<DuckFormValues>({
    resolver: zodResolver(duckFormSchema),
    defaultValues: {
      color: undefined,
      size: undefined,
      price: undefined,
      quantity: undefined,
    },
  })

  function onSubmit(values: DuckFormValues) {
    console.log(values)
  }

  return (
    <Card className="mx-auto w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Agregar nuevo patito</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-center gap-4"
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
              <Button type="submit">Agregar</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
