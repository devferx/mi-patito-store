import { z } from 'zod'
import { DuckColor, DuckSize } from '@prisma/client'
import { ShippingMethod } from '../../models/order.model'

export const CreateOrderSchema = z.object({
  color: z.nativeEnum(DuckColor, {
    required_error: 'El color del patito es requerido',
  }),
  size: z.nativeEnum(DuckSize, {
    required_error: 'El tamaño del patito es requerido',
  }),
  quantity: z
    .number({
      required_error: 'La cantidad es requerida',
    })
    .int('La cantidad debe ser un número entero')
    .positive('La cantidad debe ser positiva'),
  destinationCountry: z.string({
    required_error: 'El país de destino es requerido',
  }),
  shippingMethod: z.nativeEnum(ShippingMethod, {
    required_error: 'El método de envío es requerido',
  }),
})

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>
