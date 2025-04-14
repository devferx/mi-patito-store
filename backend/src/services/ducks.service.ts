import { DucksRepository } from '../repositories/ducks.repository'

const ducksRepository = new DucksRepository()

export const getAllDucks = async () => {
  const ducks = await ducksRepository.getAllDucks()
  return ducks
}

const getSingleDuck = async (id: number) => {
  const duck = await ducksRepository.getSingleDuck(id)

  if (!duck) {
    throw new Error(`Patito con id ${id} no encontrado`)
  }

  return duck
}

export const createDuck = async (duck: any) => {
  if (!duck.color || !duck.size || !duck.price || !duck.quantity) {
    throw new Error('El patito debe tener color, tamaño, precio y cantidad')
  }

  const existingDuck = await ducksRepository.getDuckByAttributes(
    duck.color,
    duck.size,
    duck.price,
  )

  // If duck exists, update the quantity
  if (existingDuck) {
    const updatedDuck = await ducksRepository.updateDuck(existingDuck.id, {
      quantity: existingDuck.quantity + duck.quantity,
    })

    return updatedDuck
  }

  // If duck doesn't exist, create a new one
  const createdDuck = await ducksRepository.createDuck(duck)
  return createdDuck
}

export const updateDuck = async (id: number, duck: any) => {
  await getSingleDuck(id)
  const updatedDuck = await ducksRepository.updateDuck(id, duck)

  return updatedDuck
}

export const deleteDuck = async (id: number) => {
  await getSingleDuck(id)
  await ducksRepository.deleteDuck(id)

  return true
}
