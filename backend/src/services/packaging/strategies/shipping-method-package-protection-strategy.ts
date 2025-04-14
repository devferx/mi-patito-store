import {
  PackageType,
  ProtectionType,
  ShippingMethod,
} from '../../../models/order.model'
import { ProtectionTypeStrategy } from '../interfaces/packagin-interfaces'

export class ShippingMethodPackageProtectionStrategy
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
