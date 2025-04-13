import { DuckColor, DuckSize } from '@prisma/client'

export enum ShippingMethod {
  LAND = 'Tierra',
  AIR = 'Aire',
  SEA = 'Mar',
}

export enum PackageType {
  WOOD = 'Madera',
  CARDBOARD = 'Cartón',
  PLASTIC = 'Plástico',
}

export enum ProtectionType {
  STYROFOAM = 'Bolitas de plastoformo',
  BUBBLE_WRAP = 'Bolsas con burbuja',
  MOISTURE_ABSORBING = 'Bolitas absorbentes de humedad',
  COMBINED = 'Bolitas absorbentes de humedad y bolsas con burbuja',
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
