import { PackagingFactory } from './packaging/package-factory'

import type { OrderRequest, OrderResponse } from '../models/order.model'
import { PricingCalculator } from './pricing/pricing-calculator'

const packagingFactory = new PackagingFactory()
const pricingCalculator = new PricingCalculator()

export const processOrder = async (
  orderRequest: OrderRequest,
): Promise<OrderResponse> => {
  const { packageType, protectionType } = packagingFactory.determinePackaging(
    orderRequest.size,
    orderRequest.shippingMethod,
  )

  const pricingDetails = await pricingCalculator.calculatePrice(
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
