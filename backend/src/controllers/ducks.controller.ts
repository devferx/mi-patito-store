import type { Request, Response } from 'express'

export const getDucks = (req: Request, res: Response) => {
  res.json({
    message: 'Get all ducks',
    data: [],
  })
}

export const createDuck = (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Create a new duck',
    data: req.body,
  })
}

export const updateDuck = (req: Request, res: Response) => {
  const { id } = req.params

  res.json({
    message: `Update duck with id ${id}`,
    data: req.body,
  })
}

export const deleteDuck = (req: Request, res: Response) => {
  const { id } = req.params

  res.json({
    message: `Delete duck with id ${id}`,
  })
}
