import Boom from '@hapi/boom'

import { DucksRepository } from '../repositories/ducks.repository'
import { omitMetaFields } from '../utils/omit-meta-fields'

import type { CreateDuckDto } from '../dtos/duck/create-duck.dto'
import type { UpdateDuckDto } from '../dtos/duck/update-duck.dto'

export class DucksService {
  constructor(private readonly ducksRepository: DucksRepository) {}

  async getDucks() {
    const ducks = await this.ducksRepository.getDucks()
    return {
      message: 'All ducks successfully retrieved',
      data: ducks,
    }
  }

  private async getDuckById(id: number) {
    const duck = await this.ducksRepository.getDuckById(id)

    if (!duck) {
      throw Boom.notFound('Duck not found')
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
        message: 'Duck already exists, quantity has been updated',
        data: omitMetaFields(updatedDuck),
      }
    }

    // If duck doesn't exist, create a new one
    const createdDuck = await this.ducksRepository.createDuck(duck)
    return {
      message: 'New duck created',
      data: omitMetaFields(createdDuck),
    }
  }

  async updateDuck(id: string, duck: UpdateDuckDto) {
    const updateData: UpdateDuckDto = {}
    const duckId = Number(id)

    if (!!duck.quantity) updateData.quantity = duck.quantity
    if (!!duck.price) updateData.price = duck.price

    await this.getDuckById(duckId)
    const updatedDuck = await this.ducksRepository.updateDuck(
      duckId,
      updateData,
    )

    return {
      message: `Duck with id: ${id}, was updated`,
      data: omitMetaFields(updatedDuck),
    }
  }

  async deleteDuck(id: number) {
    await this.getDuckById(id)
    await this.ducksRepository.deleteDuck(id)

    return { message: `Duck with id: ${id}, was deleted` }
  }
}
