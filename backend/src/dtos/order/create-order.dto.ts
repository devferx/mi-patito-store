import { z } from 'zod'
import { DuckColor, DuckSize } from '@prisma/client'
import { ShippingMethod } from '../../models/order.model'

export const CreateOrderSchema = z.object({
  color: z.nativeEnum(DuckColor, {
    required_error: 'The duck color is required',
  }),
  size: z.nativeEnum(DuckSize, {
    required_error: 'The duck size is required',
  }),
  quantity: z
    .number({
      required_error: 'The quantity is required',
    })
    .int('The quantity must be an integer')
    .positive('The quantity must be positive'),
  destinationCountry: z.string({
    required_error: 'The destination country is required',
  }),
  shippingMethod: z.nativeEnum(ShippingMethod, {
    required_error: 'The shipping method is required',
  }),
})

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>
