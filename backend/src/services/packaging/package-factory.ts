import { DuckSize } from '@prisma/client'
import {
  ShippingMethod,
  PackageType,
  ProtectionType,
} from '../../models/order.model'
import {
  PackageTypeStrategy,
  ProtectionTypeStrategy,
} from './interfaces/packagin-interfaces'
import { SizeBasedPackageStrategy } from './strategies/size-based-package-strategy'
import { ShippingMethodPackageProtectionStrategy } from './strategies/shipping-method-package-protection-strategy'

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
