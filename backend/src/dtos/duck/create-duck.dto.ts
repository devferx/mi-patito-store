import { z } from 'zod'
import { DuckColor, DuckSize } from '@prisma/client'

export const CreateDuckSchema = z.object({
  color: z.nativeEnum(DuckColor, {
    required_error: 'El color del patito es requerido',
  }),
  size: z.nativeEnum(DuckSize, {
    required_error: 'El tamaño del patito es requerido',
  }),
  price: z
    .number({
      required_error: 'El precio es requerido',
    })
    .positive('El precio debe ser positivo'),
  quantity: z
    .number({
      required_error: 'La cantidad es requerida',
    })
    .int('La cantidad debe ser un número entero')
    .positive('La cantidad debe ser positiva'),
})

export type CreateDuckDto = z.infer<typeof CreateDuckSchema>
