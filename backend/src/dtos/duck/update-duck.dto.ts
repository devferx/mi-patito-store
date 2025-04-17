import { z } from 'zod'

export const UpdateDuckSchema = z.object({
  price: z
    .number({
      required_error: 'El precio es requerido',
    })
    .positive('El precio debe ser positivo')
    .optional(),
  quantity: z
    .number({
      required_error: 'La cantidad es requerida',
    })
    .int('La cantidad debe ser un número entero')
    .positive('La cantidad debe ser positiva')
    .optional(),
})

export type UpdateDuckDto = z.infer<typeof UpdateDuckSchema>
