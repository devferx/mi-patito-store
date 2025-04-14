import type { Request, Response } from 'express'

import { DucksService } from '../services/ducks.service'

export class DucksController {
  constructor(private readonly ducksService: DucksService) {}

  async getDucks(req: Request, res: Response) {
    const ducks = await this.ducksService.getAllDucks()
    res.json({
      ok: true,
      message: 'Se obtuvieron todos los patitos',
      data: ducks,
    })
  }

  async createDuck(req: Request, res: Response) {
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

  async updateDuck(req: Request, res: Response) {
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

  async deleteDuck(req: Request, res: Response) {
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
