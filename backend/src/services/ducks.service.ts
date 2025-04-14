import { DucksRepository } from '../repositories/ducks.repository'

export class DucksService {
  private ducksRepository: DucksRepository

  constructor() {
    this.ducksRepository = new DucksRepository()
  }

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

      return updatedDuck
    }

    // If duck doesn't exist, create a new one
    const createdDuck = await this.ducksRepository.createDuck(duck)
    return createdDuck
  }

  async updateDuck(id: number, duck: any) {
    await this.getSingleDuck(id)
    const updatedDuck = await this.ducksRepository.updateDuck(id, duck)

    return updatedDuck
  }

  async deleteDuck(id: number) {
    await this.getSingleDuck(id)
    await this.ducksRepository.deleteDuck(id)

    return true
  }
}
