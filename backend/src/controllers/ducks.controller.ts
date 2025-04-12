import type { Request, Response } from 'express'

import * as ducksService from '../services/ducks.service'

export const getDucks = async (req: Request, res: Response) => {
  const ducks = await ducksService.getAllDucks()
  res.json({
    ok: true,
    message: 'Retrieved all ducks',
    data: ducks,
  })
}

export const createDuck = async (req: Request, res: Response) => {
  const newDuck = req.body

  const createdDuck = await ducksService.createDuck(newDuck)

  const message =
    createdDuck.quantity > newDuck.quantity
      ? 'Duck already exists, quantity updated'
      : 'Created a new duck'

  res.status(201).json({
    ok: true,
    message,
    data: createdDuck,
  })
}

export const updateDuck = async (req: Request, res: Response) => {
  const { id } = req.params
  const duck = req.body

  const updatedDuck = await ducksService.updateDuck(Number(id), duck)

  res.json({
    ok: true,
    message: `Updated duck with id ${id}`,
    data: updatedDuck,
  })
}

export const deleteDuck = async (req: Request, res: Response) => {
  const { id } = req.params

  await ducksService.deleteDuck(Number(id))

  res.json({
    ok: true,
    message: `Deleted duck with id ${id}`,
    data: {
      id,
    },
  })
}
