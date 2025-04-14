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
      totalCost: 0,
    }

    let totalCost = baseCost

    // Quantity-based discount rules
    if (quantity > 100) {
      const discountAmount = baseCost * 0.2
      details.discounts.push({
        name: 'Descuento por pedido grande (>100 unidades)',
        amount: discountAmount,
      })
      totalCost -= discountAmount
    }

    // Rules by package type
    if (packageType === PackageType.WOOD) {
      const increaseAmount = baseCost * 0.05
      details.increases.push({
        name: 'Cargo por paquete de madera',
        amount: increaseAmount,
      })
      totalCost += increaseAmount
    }
    if (packageType === PackageType.PLASTIC) {
      const increaseAmount = baseCost * 0.1
      details.increases.push({
        name: 'Cargo por paquete de plástico',
        amount: increaseAmount,
      })
      totalCost += increaseAmount
    }
    if (packageType === PackageType.CARDBOARD) {
      const discountAmount = baseCost * 0.01
      details.discounts.push({
        name: 'Descuento por paquete de cartón',
        amount: discountAmount,
      })
      totalCost -= discountAmount
    }

    // Rules by destination country
    let countryFeeRate = 0.15
    let countryFeeName = 'Cargo por envío internacional'

    const upperCountry = destinationCountry.toUpperCase()
    if (upperCountry === 'USA') {
      countryFeeRate = 0.18
      countryFeeName = 'Cargo por envío a USA'
    }
    if (upperCountry === 'BOLIVIA') {
      countryFeeRate = 0.13
      countryFeeName = 'Cargo por envío a Bolivia'
    }
    if (upperCountry === 'INDIA') {
      countryFeeRate = 0.19
      countryFeeName = 'Cargo por envío a India'
    }

    const countryFeeAmount = baseCost * countryFeeRate

    details.increases.push({
      name: countryFeeName,
      amount: countryFeeAmount,
    })
    totalCost += countryFeeAmount

    // Reglas por método de envío
    if (shippingMethod === ShippingMethod.SEA) {
      details.increases.push({
        name: 'Cargo por envío marítimo',
        amount: 400,
      })
      totalCost += 400
    }
    if (shippingMethod === ShippingMethod.LAND) {
      const landShippingFee = 10 * quantity
      details.increases.push({
        name: 'Cargo por envío terrestre',
        amount: landShippingFee,
      })
      totalCost += landShippingFee
    }
    if (shippingMethod === ShippingMethod.AIR) {
      let airShippingFee = 30 * quantity

      if (quantity > 1000) {
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
      totalCost += airShippingFee
    }

    details.totalCost = totalCost
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

  constructor() {
    this.strategy = new ComprehensivePricingStrategy()
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
