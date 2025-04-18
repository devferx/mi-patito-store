import Boom from '@hapi/boom'

import { DucksRepository } from '../repositories/ducks.repository'
import { omitMetaFields } from '../utils/omit-meta-fields'

import type { CreateDuckDto } from '../dtos/duck/create-duck.dto'
import type { UpdateDuckDto } from '../dtos/duck/update-duck.dto'

export class DucksService {
  constructor(private readonly ducksRepository: DucksRepository) {}

  async getAllDucks() {
    const ducks = await this.ducksRepository.getAllDucks()
    return {
      message: 'Se obtuvieron todos los patitos',
      data: ducks,
    }
  }

  private async getSingleDuck(id: number) {
    const duck = await this.ducksRepository.getSingleDuck(id)

    if (!duck) {
      throw Boom.notFound('Patito no encontrado')
    }

    return duck
  }

  async createDuck(duck: CreateDuckDto) {
    const existingDuck = await this.ducksRepository.getDuckByAttributes(
      duck.color,
      duck.size,
      duck.price,
    )

    // If duck exists, update the quantity
    if (existingDuck) {
      const updatedDuck = await this.ducksRepository.updateDuck(
        existingDuck.id,
        {
          quantity: existingDuck.quantity + duck.quantity,
        },
      )

      return {
        message: 'El patito ya existe, la cantidad fue actualizada',
        data: omitMetaFields(updatedDuck),
      }
    }

    // If duck doesn't exist, create a new one
    const createdDuck = await this.ducksRepository.createDuck(duck)
    return {
      message: 'Nuevo patito creado',
      data: omitMetaFields(createdDuck),
    }
  }

  async updateDuck(id: string, duck: UpdateDuckDto) {
    const updateData: UpdateDuckDto = {}
    const duckId = Number(id)

    if (!!duck.quantity) updateData.quantity = duck.quantity
    if (!!duck.price) updateData.price = duck.price

    await this.getSingleDuck(duckId)
    const updatedDuck = await this.ducksRepository.updateDuck(
      duckId,
      updateData,
    )

    return {
      message: `Patito ${id} actualizado`,
      data: omitMetaFields(updatedDuck),
    }
  }

  async deleteDuck(id: number) {
    await this.getSingleDuck(id)
    await this.ducksRepository.deleteDuck(id)

    return { message: `Patito eliminado con id ${id}` }
  }
}
