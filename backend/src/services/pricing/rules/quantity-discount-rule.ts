import {
  PricingDetails,
  PricingParams,
  PricingRule,
} from '../interfaces/pricing-interfaces'

export class QuantityDiscountRule implements PricingRule {
  apply(details: PricingDetails, params: PricingParams): void {
    if (params.quantity > 100) {
      const discountAmount = params.baseCost * 0.2
      details.discounts.push({
        name: 'Descuento por pedido grande (>100 unidades)',
        amount: discountAmount,
      })
      details.totalCost -= discountAmount
    }
  }
}
