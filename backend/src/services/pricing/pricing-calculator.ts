import { DuckColor, DuckSize } from '@prisma/client'

import { PackageType, ShippingMethod } from '../../models/order.model'
import {
  PricingDetails,
  PricingStrategy,
} from './interfaces/pricing-interfaces'
import { ComprehensivePricingStrategy } from './strategies/comprehensive-pricing-strategy'

export class PricingCalculator {
  private strategy: PricingStrategy

  constructor(strategy?: PricingStrategy) {
    this.strategy = strategy || new ComprehensivePricingStrategy()
  }

  async calculatePrice(
    color: DuckColor,
    size: DuckSize,
    quantity: number,
    packageType: PackageType,
    destinationCountry: string,
    shippingMethod: ShippingMethod,
  ): Promise<PricingDetails> {
    return this.strategy.calculatePrice(
      color,
      size,
      quantity,
      packageType,
      destinationCountry,
      shippingMethod,
    )
  }
}
