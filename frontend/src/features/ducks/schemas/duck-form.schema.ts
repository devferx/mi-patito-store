import { z } from 'zod'
import { DUCK_COLORS, DUCK_SIZES } from '@ducks/constants/ducks'

export const duckFormSchema = z.object({
  color: z.enum(DUCK_COLORS, {
    required_error: 'Please select a color',
  }),
  size: z.enum(DUCK_SIZES, {
    required_error: 'Please select a size',
  }),
  price: z.coerce
    .number()
    .positive('Price must be positive')
    .min(0.01, 'Minimum price is 0.01'),
  quantity: z.coerce
    .number()
    .int('Quantity must be an integer')
    .positive('Quantity must be positive')
    .min(1, 'Minimum quantity is 1'),
})

export type DuckFormValues = z.infer<typeof duckFormSchema>
