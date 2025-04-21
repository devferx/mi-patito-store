import { PackageType } from '../../../models/order.model'
import {
  PricingDetails,
  PricingParams,
  PricingRule,
} from '../interfaces/pricing-interfaces'

export class PackageTypeRule implements PricingRule {
  apply(details: PricingDetails, params: PricingParams): void {
    if (params.packageType === PackageType.WOOD) {
      const increaseAmount = params.baseCost * 0.05
      details.increases.push({
        name: 'Charge for wooden package',
        amount: increaseAmount,
      })
      details.totalCost += increaseAmount
    }

    if (params.packageType === PackageType.PLASTIC) {
      const increaseAmount = params.baseCost * 0.1
      details.increases.push({
        name: 'Charge for plastic package',
        amount: increaseAmount,
      })
      details.totalCost += increaseAmount
    }

    if (params.packageType === PackageType.CARDBOARD) {
      const discountAmount = params.baseCost * 0.01
      details.discounts.push({
        name: 'Discount for cardboard package',
        amount: discountAmount,
      })
      details.totalCost -= discountAmount
    }
  }
}
