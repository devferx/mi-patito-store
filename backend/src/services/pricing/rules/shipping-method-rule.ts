import { ShippingMethod } from '../../../models/order.model'
import {
  PricingDetails,
  PricingParams,
  PricingRule,
} from '../interfaces/pricing-interfaces'

export class ShippingMethodRule implements PricingRule {
  apply(details: PricingDetails, params: PricingParams): void {
    if (params.shippingMethod === ShippingMethod.SEA) {
      details.increases.push({
        name: 'Sea shipping charge',
        amount: 400,
      })
      details.totalCost += 400
    }
    if (params.shippingMethod === ShippingMethod.LAND) {
      const landShippingFee = 10 * params.quantity
      details.increases.push({
        name: 'Land shipping charge',
        amount: landShippingFee,
      })
      details.totalCost += landShippingFee
    }
    if (params.shippingMethod === ShippingMethod.AIR) {
      let airShippingFee = 30 * params.quantity
      details.increases.push({
        name: 'Air shipping charge',
        amount: airShippingFee,
      })

      if (params.quantity > 1000) {
        const airDiscount = airShippingFee * 0.15
        details.discounts.push({
          name: 'Discount for large air shipping (>1000 units)',
          amount: airDiscount,
        })
        airShippingFee -= airDiscount
      }
      details.totalCost += airShippingFee
    }
  }
}
