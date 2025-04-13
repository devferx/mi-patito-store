import { Request, Response } from 'express'

import * as ordersService from '../services/orders.service'
import { OrderRequest, ShippingMethod } from '../models/order.model'

export const createOrder = async (req: Request, res: Response) => {
  const { color, size, quantity, destinationCountry, shippingMethod } = req.body

  if (!color || !size || !quantity || !destinationCountry || !shippingMethod) {
    res.status(400).json({
      ok: false,
      message: 'Missing required fields',
    })
    return
  }

  let normalizedShippingMethod: ShippingMethod

  if (
    shippingMethod === 'Tierra' ||
    shippingMethod.toLowerCase() === 'tierra'
  ) {
    normalizedShippingMethod = ShippingMethod.LAND
  } else if (
    shippingMethod === 'Aire' ||
    shippingMethod.toLowerCase() === 'aire'
  ) {
    normalizedShippingMethod = ShippingMethod.AIR
  } else if (
    shippingMethod === 'Mar' ||
    shippingMethod.toLowerCase() === 'mar'
  ) {
    normalizedShippingMethod = ShippingMethod.SEA
  } else {
    res.status(400).json({
      ok: false,
      message: 'Método de envío inválido. Use Tierra, Aire o Mar',
    })

    return
  }

  const orderRequest: OrderRequest = {
    color,
    size,
    quantity: Number(quantity),
    destinationCountry,
    shippingMethod: normalizedShippingMethod,
  }

  const orderResponse = await ordersService.processOrder(orderRequest)

  res.status(201).json({
    ok: true,
    message: 'Order processed successfully',
    data: orderResponse,
  })
}
