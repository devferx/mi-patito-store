import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      next()
      return
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          ok: false,
          message: 'Datos de entrada inválidos',
          errors: error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        })
        return
      }
      res.status(500).json({
        ok: false,
        message: 'Error interno del servidor',
      })
      return
    }
  }
}
