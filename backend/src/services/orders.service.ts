import { PackagingFactory } from './packaging'
import { PricingCalculator } from './pricing'

import type { OrderRequest, OrderResponse } from '../models/order.model'
import { ShippingMethod } from '../models/order.model'

export class OrdersService {
  private packagingFactory: PackagingFactory
  private pricingCalculator: PricingCalculator

  constructor() {
    this.packagingFactory = new PackagingFactory()
    this.pricingCalculator = new PricingCalculator()
  }

  normalizeShippingMethod(shippingMethod: string): {
    isValid: boolean
    method?: ShippingMethod
  } {
    const shippingMethodMap: Record<string, ShippingMethod> = {
      land: ShippingMethod.LAND,
      air: ShippingMethod.AIR,
      sea: ShippingMethod.SEA,
    }

    const shippingMethodLower = shippingMethod.toLowerCase()
    const method = shippingMethodMap[shippingMethodLower]

    return method ? { isValid: true, method } : { isValid: false }
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
