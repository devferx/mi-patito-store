import { DuckColor, DuckSize } from '@prisma/client'

import { PackageType, ShippingMethod } from '../../../models/order.model'
import { DucksRepository } from '../../../repositories/ducks.repository'
import { DucksService } from '../../ducks.service'
import {
  PricingDetails,
  PricingParams,
  PricingRule,
  PricingStrategy,
} from '../interfaces/pricing-interfaces'
import {
  DestinationFeeRule,
  PackageTypeRule,
  QuantityDiscountRule,
  ShippingMethodRule,
} from '../rules/'

// Initialize services
const ducksRepository = new DucksRepository()
const ducksService = new DucksService(ducksRepository)

export class ComprehensivePricingStrategy implements PricingStrategy {
  private pricingRules: PricingRule[]

  constructor() {
    this.pricingRules = [
      new QuantityDiscountRule(),
      new PackageTypeRule(),
      new DestinationFeeRule(),
      new ShippingMethodRule(),
    ]
  }

  async calculatePrice(
    color: DuckColor,
    size: DuckSize,
    quantity: number,
    packageType: PackageType,
    destinationCountry: string,
    shippingMethod: ShippingMethod,
  ): Promise<PricingDetails> {
    const duck = await this.findDuckByAttributes(color, size)
    if (!duck) {
      throw new Error('No se encontró el pato con los atributos especificados')
    }

    const price = duck.price
    const baseCost = price * quantity

    const details: PricingDetails = {
      baseCost,
      discounts: [],
      increases: [],
      totalCost: baseCost,
    }

    const params: PricingParams = {
      baseCost,
      quantity,
      packageType,
      destinationCountry,
      shippingMethod,
    }

    this.pricingRules.forEach((rule) => rule.apply(details, params))

    return details
  }

  private async findDuckByAttributes(
    color: DuckColor,
    size: DuckSize,
  ): Promise<any> {
    const { data: ducks } = await ducksService.getAllDucks()
    return ducks.find((duck) => duck.color === color && duck.size === size)
  }
}
