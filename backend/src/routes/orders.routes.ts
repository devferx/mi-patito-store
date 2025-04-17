import { Router } from 'express'

import { OrdersController } from '../controllers/orders.controller'
import { OrdersService } from '../services/orders.service'
import { validateRequest } from '../middlewares/validate-request'
import { CreateOrderSchema } from '../dtos/order/create-order.dto'

const router = Router()

const ordersService = new OrdersService()
const ordersController = new OrdersController(ordersService)

router.post(
  '/',
  validateRequest(CreateOrderSchema),
  ordersController.createOrder,
)

export default router
