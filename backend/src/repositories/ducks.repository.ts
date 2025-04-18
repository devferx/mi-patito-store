import { orm } from '../lib/prisma'

import type { DuckColor, DuckSize } from '@prisma/client'
import type { CreateDuckDto } from '../dtos/duck/create-duck.dto'
import type { UpdateDuckDto } from '../dtos/duck/update-duck.dto'

export class DucksRepository {
  async getDucks() {
    const ducks = await orm.duck.findMany({
      select: {
        id: true,
        color: true,
        size: true,
        price: true,
        quantity: true,
      },
      where: {
        isDeleted: false,
      },
      orderBy: {
        quantity: 'desc',
      },
    })

    return ducks
  }

  async getDuckById(id: number) {
    const duck = await orm.duck.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    })

    return duck
  }

  async getDuckByAttributes(color: DuckColor, size: DuckSize, price: number) {
    const duck = await orm.duck.findFirst({
      where: {
        color,
        size,
        price,
        isDeleted: false,
      },
    })
    return duck
  }

  async createDuck(duck: CreateDuckDto) {
    const createdDuck = await orm.duck.create({
      data: {
        color: duck.color,
        size: duck.size,
        price: duck.price,
        quantity: duck.quantity,
      },
    })

    return createdDuck
  }

  async updateDuck(id: number, duck: UpdateDuckDto) {
    const updatedDuck = await orm.duck.update({
      where: {
        id,
        isDeleted: false,
      },
      data: duck,
    })

    return updatedDuck
  }

  async deleteDuck(id: number) {
    await orm.duck.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    })
  }
}
