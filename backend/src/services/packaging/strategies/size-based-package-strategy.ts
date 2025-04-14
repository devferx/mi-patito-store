import { PackageType } from '../../../models/order.model'

import type { DuckSize } from '@prisma/client'
import type { PackageTypeStrategy } from '../interfaces/packagin-interfaces'

export class SizeBasedPackageStrategy implements PackageTypeStrategy {
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
