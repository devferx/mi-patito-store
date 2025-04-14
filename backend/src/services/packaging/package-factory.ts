import { ShippingMethodPackageProtectionStrategy } from './strategies/shipping-method-package-protection-strategy'
import { SizeBasedPackageStrategy } from './strategies/size-based-package-strategy'

import type { DuckSize } from '@prisma/client'
import type {
  PackageType,
  ProtectionType,
  ShippingMethod,
} from '../../models/order.model'
import type {
  PackageTypeStrategy,
  ProtectionTypeStrategy,
} from './interfaces/packagin-interfaces'

export class PackagingFactory {
  private packageTypeStrategy: PackageTypeStrategy
  private protectionTypeStrategy: ProtectionTypeStrategy

  constructor(
    packageTypeStrategy?: PackageTypeStrategy,
    protectionTypeStrategy?: ProtectionTypeStrategy,
  ) {
    this.packageTypeStrategy =
      packageTypeStrategy || new SizeBasedPackageStrategy()
    this.protectionTypeStrategy =
      protectionTypeStrategy || new ShippingMethodPackageProtectionStrategy()
  }

  determinePackaging(
    size: DuckSize,
    shippingMethod: ShippingMethod,
  ): {
    packageType: PackageType
    protectionType: ProtectionType
  } {
    const packageType = this.packageTypeStrategy.determinePackageType(size)
    const protectionType = this.protectionTypeStrategy.determineProtectionType(
      packageType,
      shippingMethod,
    )

    return {
      packageType,
      protectionType,
    }
  }
}
