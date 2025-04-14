import { Router } from 'express'

import { OrdersController } from '../controllers/orders.controller'
import { OrdersService } from '../services/orders.service'

const router = Router()

const ordersService = new OrdersService()
const ordersController = new OrdersController(ordersService)

router.post('/', ordersController.createOrder)

export default router
