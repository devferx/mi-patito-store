import { PackagingFactory } from './packaging'
import { PricingCalculator } from './pricing'

import type { OrderRequest, OrderResponse } from '../models/order.model'
import type { CreateOrderDto } from '../dtos/order/create-order.dto'

export class OrdersService {
  private packagingFactory: PackagingFactory
  private pricingCalculator: PricingCalculator

  constructor() {
    this.packagingFactory = new PackagingFactory()
    this.pricingCalculator = new PricingCalculator()
  }

  async createOrder(orderDto: CreateOrderDto) {
    const { color, size, quantity, destinationCountry, shippingMethod } =
      orderDto

    const orderRequest: OrderRequest = {
      color,
      size,
      quantity: Number(quantity),
      destinationCountry,
      shippingMethod,
    }

    const orderResponse = await this.processOrder(orderRequest)

    return {
      message: 'Order processed successfully',
      data: orderResponse,
    }
  }

  async processOrder(orderRequest: OrderRequest): Promise<OrderResponse> {
    const { packageType, protectionType } =
      this.packagingFactory.determinePackaging(
        orderRequest.size,
        orderRequest.shippingMethod,
      )

    const pricingDetails = await this.pricingCalculator.calculatePrice(
      orderRequest.color,
      orderRequest.size,
      orderRequest.quantity,
      packageType,
      orderRequest.destinationCountry,
      orderRequest.shippingMethod,
    )

    const order: OrderResponse = {
      packageType,
      protectionType,
      totalCost: pricingDetails.totalCost,
      details: {
        baseCost: pricingDetails.baseCost,
        discounts: pricingDetails.discounts,
        increases: pricingDetails.increases,
      },
    }

    return order
  }
}
