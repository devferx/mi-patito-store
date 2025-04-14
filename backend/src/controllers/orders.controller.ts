import { Request, Response } from 'express'

import { OrdersService } from '../services/orders.service'

import { type OrderRequest, ShippingMethod } from '../models/order.model'

export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  createOrder = async (req: Request, res: Response) => {
    const { color, size, quantity, destinationCountry, shippingMethod } =
      req.body

    if (
      !color ||
      !size ||
      !quantity ||
      !destinationCountry ||
      !shippingMethod
    ) {
      res.status(400).json({
        ok: false,
        message: 'Missing required fields',
      })
      return
    }

    const shippingMethodResult =
      this.ordersService.normalizeShippingMethod(shippingMethod)

    if (!shippingMethodResult.isValid) {
      res.status(400).json({
        ok: false,
        message: `Método de envío inválido. Usa "air", "land" o "sea"`,
      })
      return
    }

    const orderRequest: OrderRequest = {
      color,
      size,
      quantity: Number(quantity),
      destinationCountry,
      shippingMethod: shippingMethodResult.method!,
    }

    const orderResponse = await this.ordersService.processOrder(orderRequest)

    res.status(201).json({
      ok: true,
      message: 'Order processed successfully',
      data: orderResponse,
    })
  }
}
