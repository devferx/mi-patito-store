import type { DuckSize } from '@prisma/client'
import type {
  PackageType,
  ProtectionType,
  ShippingMethod,
} from '../../../models/order.model'

export interface PackageTypeStrategy {
  determinePackageType(size: DuckSize): PackageType
}

export interface ProtectionTypeStrategy {
  determineProtectionType(
    packageType: PackageType,
    shippingMethod: ShippingMethod,
  ): ProtectionType
}
