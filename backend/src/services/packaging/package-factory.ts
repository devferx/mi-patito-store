import { DuckSize } from '@prisma/client'
import {
  ShippingMethod,
  PackageType,
  ProtectionType,
} from '../../models/order.model'

interface PackageTypeStrategy {
  determinePackageType(size: DuckSize): PackageType
}

class SizeBasedPackageStrategy implements PackageTypeStrategy {
  determinePackageType(size: DuckSize): PackageType {
    if (size === 'XLarge' || size === 'Large') {
      return PackageType.WOOD
    } else if (size === 'Medium') {
      return PackageType.CARDBOARD
    } else {
      return PackageType.PLASTIC
    }
  }
}

interface ProtectionTypeStrategy {
  determineProtectionType(
    packageType: PackageType,
    shippingMethod: ShippingMethod,
  ): ProtectionType
}

class ShippingMethodPackageProtectionStrategy
  implements ProtectionTypeStrategy
{
  determineProtectionType(
    packageType: PackageType,
    shippingMethod: ShippingMethod,
  ): ProtectionType {
    // Shipping method is AIR
    if (
      shippingMethod === ShippingMethod.AIR &&
      packageType === PackageType.PLASTIC
    ) {
      return ProtectionType.BUBBLE_WRAP
    }
    if (shippingMethod === ShippingMethod.AIR) {
      return ProtectionType.STYROFOAM
    }

    // Shipping method is LAND
    if (shippingMethod === ShippingMethod.LAND) {
      return ProtectionType.STYROFOAM
    }

    // Shipping method is SEA
    return ProtectionType.COMBINED
  }
}

export class PackagingFactory {
  private packageTypeStrategy: PackageTypeStrategy
  private protectionTypeStrategy: ProtectionTypeStrategy

  constructor() {
    this.packageTypeStrategy = new SizeBasedPackageStrategy()
    this.protectionTypeStrategy = new ShippingMethodPackageProtectionStrategy()
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
