import { DuckSize } from '@prisma/client'

import {
  ShippingMethod,
  PackageType,
  ProtectionType,
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
