import Boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validatorHandler = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const boomError = Boom.badRequest('Datos de entrada inválidos')
        boomError.output.payload.errors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }))
        next(boomError)
        return
      }

      next(Boom.internal('Error interno del servidor'))
    }
  }
}
