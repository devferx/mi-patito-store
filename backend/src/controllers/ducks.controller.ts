import type { Request, Response } from 'express'

import { DucksService } from '../services/ducks.service'

import { omitMetaFields } from '../utils/omit-meta-fields'

const ducksService = new DucksService()

export const getDucks = async (req: Request, res: Response) => {
  const ducks = await ducksService.getAllDucks()
  res.json({
    ok: true,
    message: 'Se obtuvieron todos los patitos',
    data: ducks,
  })
}

export const createDuck = async (req: Request, res: Response) => {
  const newDuck = req.body

  try {
    const createdDuck = await ducksService.createDuck(newDuck)

    const message =
      createdDuck.quantity > newDuck.quantity
        ? 'El patito ya existe, la cantidad fue actualizada'
        : 'Nuevo patito creado'

    res.status(201).json({
      ok: true,
      message,
      data: omitMetaFields(createdDuck),
    })
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: `Error al crear el patito: ${error.message ?? 'Unknown error'}`,
    })
  }
}

export const updateDuck = async (req: Request, res: Response) => {
  const { id } = req.params
  const duck = req.body

  const updateData: any = {}

  if (!!duck.quantity) updateData.quantity = duck.quantity
  if (!!duck.price) updateData.price = duck.price

  try {
    const updatedDuck = await ducksService.updateDuck(Number(id), updateData)

    res.json({
      ok: true,
      message: 'Patito actualizado',
      data: omitMetaFields(updatedDuck),
    })
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: `Error al actualizar el patito: ${
        error.message ?? 'Unknown error'
      }`,
    })
  }
}

export const deleteDuck = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await ducksService.deleteDuck(Number(id))

    res.json({
      ok: true,
      message: `Patito eliminado con id ${id}`,
    })
  } catch (error: any) {
    res.status(400).json({
      ok: false,
      message: `Error al eliminar el patito: ${
        error.message ?? 'Unknown error'
      }`,
    })
  }
}
