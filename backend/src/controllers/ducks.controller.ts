import type { Request, Response } from 'express'

import { DucksService } from '../services/ducks.service'

import type { CreateDuckDto } from '../dtos/duck/create-duck.dto'
import type { UpdateDuckDto } from '../dtos/duck/update-duck.dto'

export class DucksController {
  constructor(private readonly ducksService: DucksService) {}

  getDucks = async (req: Request, res: Response) => {
    const ducks = await this.ducksService.getAllDucks()
    res.json({
      ok: true,
      message: 'Se obtuvieron todos los patitos',
      data: ducks,
    })
  }

  createDuck = async (req: Request<{}, {}, CreateDuckDto>, res: Response) => {
    const newDuck = req.body

    try {
      const createdDuck = await this.ducksService.createDuck(newDuck)

      const message =
        createdDuck.quantity > newDuck.quantity
          ? 'El patito ya existe, la cantidad fue actualizada'
          : 'Nuevo patito creado'

      res.status(201).json({
        ok: true,
        message,
        data: createdDuck,
      })
    } catch (error: any) {
      res.status(400).json({
        ok: false,
        message: `Error al crear el patito: ${
          error.message ?? 'Unknown error'
        }`,
      })
    }
  }

  updateDuck = async (
    req: Request<{ id: string }, {}, UpdateDuckDto>,
    res: Response,
  ) => {
    const { id } = req.params
    const duck = req.body

    try {
      const updatedDuck = await this.ducksService.updateDuck(Number(id), duck)

      res.json({
        ok: true,
        message: 'Patito actualizado',
        data: updatedDuck,
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

  deleteDuck = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      await this.ducksService.deleteDuck(Number(id))

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
}
