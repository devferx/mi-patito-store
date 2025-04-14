import { DuckColor, DuckSize } from '@prisma/client'

import { DucksService } from '../ducks.service'

import { PackageType, ShippingMethod } from '../../models/order.model'
import { DucksRepository } from '../../repositories/ducks.repository'

const ducksRepository = new DucksRepository()
const ducksService = new DucksService(ducksRepository)

export interface PricingDetails {
  baseCost: number
  discounts: { name: string; amount: number }[]
  increases: { name: string; amount: number }[]
  totalCost: number
}

export interface PricingParams {
  baseCost: number
  quantity: number
  packageType: PackageType
  destinationCountry: string
  shippingMethod: ShippingMethod
}

export interface PricingRule {
  apply(details: PricingDetails, params: PricingParams): void
}

export class QuantityDiscountRule implements PricingRule {
  apply(details: PricingDetails, params: PricingParams): void {
    if (params.quantity > 100) {
      const discountAmount = params.baseCost * 0.2
      details.discounts.push({
        name: 'Descuento por pedido grande (>100 unidades)',
        amount: discountAmount,
      })
      details.totalCost -= discountAmount
    }
  }
}

export class PackageTypeRule implements PricingRule {
  apply(details: PricingDetails, params: PricingParams): void {
    if (params.packageType === PackageType.WOOD) {
      const increaseAmount = params.baseCost * 0.05
      details.increases.push({
        name: 'Cargo por paquete de madera',
        amount: increaseAmount,
      })
      details.totalCost += increaseAmount
    }

    if (params.packageType === PackageType.PLASTIC) {
      const increaseAmount = params.baseCost * 0.1
      details.increases.push({
        name: 'Cargo por paquete de plástico',
        amount: increaseAmount,
      })
      details.totalCost += increaseAmount
    }

    if (params.packageType === PackageType.CARDBOARD) {
      const discountAmount = params.baseCost * 0.01
      details.discounts.push({
        name: 'Descuento por paquete de cartón',
        amount: discountAmount,
      })
      details.totalCost -= discountAmount
    }
  }
}

export class DestinationFeeRule implements PricingRule {
  apply(details: PricingDetails, params: PricingParams): void {
    let countryFeeRate = 0.15
    let countryFeeName = 'Cargo por envío internacional'

    const upperCountry = params.destinationCountry.toUpperCase()
    if (upperCountry === 'USA') {
      countryFeeRate = 0.18
      countryFeeName = 'Cargo por envío a USA'
    } else if (upperCountry === 'BOLIVIA') {
      countryFeeRate = 0.13
      countryFeeName = 'Cargo por envío a Bolivia'
    } else if (upperCountry === 'INDIA') {
      countryFeeRate = 0.19
      countryFeeName = 'Cargo por envío a India'
    }

    const countryFeeAmount = params.baseCost * countryFeeRate
    details.increases.push({
      name: countryFeeName,
      amount: countryFeeAmount,
    })
    details.totalCost += countryFeeAmount
  }
}

export class ShippingMethodRule implements PricingRule {
  apply(details: PricingDetails, params: PricingParams): void {
    if (params.shippingMethod === ShippingMethod.SEA) {
      details.increases.push({
        name: 'Cargo por envío marítimo',
        amount: 400,
      })
      details.totalCost += 400
    }
    if (params.shippingMethod === ShippingMethod.LAND) {
      const landShippingFee = 10 * params.quantity
      details.increases.push({
        name: 'Cargo por envío terrestre',
        amount: landShippingFee,
      })
      details.totalCost += landShippingFee
    }
    if (params.shippingMethod === ShippingMethod.AIR) {
      let airShippingFee = 30 * params.quantity
      if (params.quantity > 1000) {
        const airDiscount = airShippingFee * 0.15
        details.discounts.push({
          name: 'Descuento por envío aéreo grande (>1000 unidades)',
          amount: airDiscount,
        })
        airShippingFee -= airDiscount
      }
      details.increases.push({
        name: 'Cargo por envío aéreo',
        amount: airShippingFee,
      })
      details.totalCost += airShippingFee
    }
  }
}

interface PricingStrategy {
  calculatePrice(
    color: DuckColor,
    size: DuckSize,
    quantity: number,
    packageType: PackageType,
    destinationCountry: string,
    shippingMethod: ShippingMethod,
  ): Promise<PricingDetails>
}

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
    const ducks = await ducksService.getAllDucks()
    return ducks.find((duck) => duck.color === color && duck.size === size)
  }
}

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
