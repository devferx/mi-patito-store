import { Request, Response } from 'express'

import { OrdersService } from '../services/orders.service'

import type { CreateOrderDto } from '../dtos/order/create-order.dto'
import type { OrderRequest } from '../models/order.model'

export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  createOrder = async (req: Request<{}, {}, CreateOrderDto>, res: Response) => {
    const { color, size, quantity, destinationCountry, shippingMethod } =
      req.body

    const orderRequest: OrderRequest = {
      color,
      size,
      quantity: Number(quantity),
      destinationCountry,
      shippingMethod,
    }

    const orderResponse = await this.ordersService.processOrder(orderRequest)

    res.status(201).json({
      ok: true,
      message: 'Order processed successfully',
      data: orderResponse,
    })
  }
}
