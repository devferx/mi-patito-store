import type { Request, Response } from 'express'

import * as ducksService from '../services/ducks.service'

export const getDucks = async (req: Request, res: Response) => {
  const ducks = await ducksService.getAllDucks()
  res.json({
    ok: true,
    message: 'Get all ducks',
    data: ducks,
  })
}

export const createDuck = async (req: Request, res: Response) => {
  const newDuck = req.body

  const createdDuck = await ducksService.createDuck(newDuck)

  res.status(201).json({
    ok: true,
    message: 'Create a new duck',
    data: createdDuck,
  })
}

export const updateDuck = async (req: Request, res: Response) => {
  const { id } = req.params
  const duck = req.body

  const updatedDuck = await ducksService.updateDuck(Number(id), duck)

  res.json({
    ok: true,
    message: `Update duck with id ${id}`,
    data: updatedDuck,
  })
}

export const deleteDuck = async (req: Request, res: Response) => {
  const { id } = req.params

  const deletedDuck = await ducksService.deleteDuck(Number(id))

  res.json({
    ok: true,
    message: `Delete duck with id ${id}`,
    data: deletedDuck,
  })
}
