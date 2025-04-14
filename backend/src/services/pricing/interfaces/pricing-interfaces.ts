import { DuckColor, DuckSize } from '@prisma/client'
import { PackageType, ShippingMethod } from '../../../models/order.model'

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

export interface PricingStrategy {
  calculatePrice(
    color: DuckColor,
    size: DuckSize,
    quantity: number,
    packageType: PackageType,
    destinationCountry: string,
    shippingMethod: ShippingMethod,
  ): Promise<PricingDetails>
}
