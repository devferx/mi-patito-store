import type { Request, Response } from 'express'

import { DucksService } from '../services/ducks.service'

import type { CreateDuckDto } from '../dtos/duck/create-duck.dto'
import type { UpdateDuckDto } from '../dtos/duck/update-duck.dto'

export class DucksController {
  constructor(private readonly ducksService: DucksService) {}

  getDucks = async (req: Request, res: Response) => {
    const { message, data } = await this.ducksService.getDucks()
    res.json({ message, data })
  }

  createDuck = async (req: Request<{}, {}, CreateDuckDto>, res: Response) => {
    const newDuck = req.body
    const { message, data } = await this.ducksService.createDuck(newDuck)
    res.status(201).json({ message, data })
  }

  updateDuck = async (
    req: Request<{ id: string }, {}, UpdateDuckDto>,
    res: Response,
  ) => {
    const { id } = req.params
    const duck = req.body

    const { message, data } = await this.ducksService.updateDuck(id, duck)
    res.json({ message, data })
  }

  deleteDuck = async (req: Request, res: Response) => {
    const { id } = req.params
    const { message } = await this.ducksService.deleteDuck(Number(id))
    res.json({ message })
  }
}
