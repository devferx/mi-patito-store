import type { Request, Response, NextFunction } from 'express'
import Boom from '@hapi/boom'

export const boomErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (Boom.isBoom(err)) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
    return
  }

  res.status(500).json({
    statusCode: 500,
    error: 'Internal Server Error',
    message: err instanceof Error ? err.message : 'Unknown error',
  })
}
