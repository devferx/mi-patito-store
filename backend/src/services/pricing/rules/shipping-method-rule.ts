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
        name: 'Cargo por envío marítimo',
        amount: 400,
      })
      details.totalCost += 400
    }
    if (params.shippingMethod === ShippingMethod.LAND) {
      const landShippingFee = 10 * params.quantity
      details.increases.push({
        name: 'Cargo por envío terrestre',
        amount: landShippingFee,
      })
      details.totalCost += landShippingFee
    }
    if (params.shippingMethod === ShippingMethod.AIR) {
      let airShippingFee = 30 * params.quantity
      if (params.quantity > 1000) {
        const airDiscount = airShippingFee * 0.15
        details.discounts.push({
          name: 'Descuento por envío aéreo grande (>1000 unidades)',
          amount: airDiscount,
        })
        airShippingFee -= airDiscount
      }
      details.increases.push({
        name: 'Cargo por envío aéreo',
        amount: airShippingFee,
      })
      details.totalCost += airShippingFee
    }
  }
}
