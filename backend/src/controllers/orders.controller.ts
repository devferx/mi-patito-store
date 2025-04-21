import type { Request, Response } from 'express'

import { OrdersService } from '../services/orders.service'

import type { CreateOrderDto } from '../dtos/order/create-order.dto'

export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  createOrder = async (req: Request<{}, {}, CreateOrderDto>, res: Response) => {
    const orderDto = req.body
    const { message, data } = await this.ordersService.createOrder(orderDto)
    res.status(201).json({ message, data })
  }
}
