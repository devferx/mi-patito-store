import { DucksRepository } from '../repositories/ducks.repository'
import { omitMetaFields } from '../utils/omit-meta-fields'

export class DucksService {
  constructor(private readonly ducksRepository: DucksRepository) {}

  async getAllDucks() {
    const ducks = await this.ducksRepository.getAllDucks()
    return ducks
  }

  private async getSingleDuck(id: number) {
    const duck = await this.ducksRepository.getSingleDuck(id)

    if (!duck) {
      throw new Error(`Patito con id ${id} no encontrado`)
    }

    return duck
  }

  async createDuck(duck: any) {
    if (!duck.color || !duck.size || !duck.price || !duck.quantity) {
      throw new Error('El patito debe tener color, tamaño, precio y cantidad')
    }

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

      return omitMetaFields(updatedDuck)
    }

    // If duck doesn't exist, create a new one
    const createdDuck = await this.ducksRepository.createDuck(duck)
    return omitMetaFields(createdDuck)
  }

  async updateDuck(id: number, duck: any) {
    const updateData: any = {}

    if (!!duck.quantity) updateData.quantity = duck.quantity
    if (!!duck.price) updateData.price = duck.price

    await this.getSingleDuck(id)
    const updatedDuck = await this.ducksRepository.updateDuck(id, updateData)

    return omitMetaFields(updatedDuck)
  }

  async deleteDuck(id: number) {
    await this.getSingleDuck(id)
    await this.ducksRepository.deleteDuck(id)

    return true
  }
}
