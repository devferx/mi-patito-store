import { z } from 'zod'

export const duckFormSchema = z.object({
  color: z.enum(['Red', 'Green', 'Yellow', 'Black'] as const, {
    required_error: 'Por favor selecciona un color',
  }),
  size: z.enum(['XLarge', 'Large', 'Medium', 'Small', 'XSmall'] as const, {
    required_error: 'Por favor selecciona un tamaño',
  }),
  price: z.coerce
    .number()
    .positive('El precio debe ser positivo')
    .min(0.01, 'El precio mínimo es 0.01'),
  quantity: z.coerce
    .number()
    .int('La cantidad debe ser un número entero')
    .positive('La cantidad debe ser positiva')
    .min(1, 'La cantidad mínima es 1'),
})

export type DuckFormValues = z.infer<typeof duckFormSchema>
