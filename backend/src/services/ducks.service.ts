import { DuckColor, DuckSize } from '@prisma/client'
import { orm } from '../lib/prisma'
import { omitMetaFields } from '../utils/omit-meta-fields'

export const getAllDucks = async () => {
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

const findDuckByAttributes = async (
  color: DuckColor,
  size: DuckSize,
  price: number,
) => {
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

export const createDuck = async (duck: any) => {
  const existingDuck = await findDuckByAttributes(
    duck.color,
    duck.size,
    duck.price,
  )

  // If duck exists, update the quantity
  if (existingDuck) {
    const updatedDuck = await orm.duck.update({
      where: { id: existingDuck.id },
      data: {
        quantity: existingDuck.quantity + duck.quantity,
      },
    })

    return omitMetaFields(updatedDuck)
  }

  // If duck doesn't exist, create a new one
  const createdDuck = await orm.duck.create({
    data: {
      color: duck.color,
      size: duck.size,
      price: duck.price,
      quantity: duck.quantity,
    },
  })

  return omitMetaFields(createdDuck)
}

export const updateDuck = async (id: number, duck: any) => {
  const updatedDuck = await orm.duck.update({
    where: {
      id,
      isDeleted: false,
    },
    data: duck,
  })

  return omitMetaFields(updatedDuck)
}

export const deleteDuck = async (id: number) => {
  await orm.duck.update({
    where: {
      id,
      isDeleted: false,
    },
    data: {
      isDeleted: true,
    },
  })
}
