import { DuckColor, DuckSize } from '@prisma/client'

export enum ShippingMethod {
  LAND = 'Land',
  AIR = 'Air',
  SEA = 'Sea',
}

export enum PackageType {
  WOOD = 'Wood',
  CARDBOARD = 'Cardboard',
  PLASTIC = 'Plastic',
}

export enum ProtectionType {
  STYROFOAM = 'Styrofoam balls',
  BUBBLE_WRAP = 'Bubble wrap bags',
  MOISTURE_ABSORBING = 'Moisture-absorbing balls',
  COMBINED = 'Moisture-absorbing balls and bubble wrap bags',
}

export interface OrderRequest {
  color: DuckColor
  size: DuckSize
  quantity: number
  destinationCountry: string
  shippingMethod: ShippingMethod
}

export interface OrderResponse {
  packageType: PackageType
  protectionType: ProtectionType
  totalCost: number
  details: {
    baseCost: number
    discounts: {
      name: string
      amount: number
    }[]
    increases: {
      name: string
      amount: number
    }[]
  }
}
