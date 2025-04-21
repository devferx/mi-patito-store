import {
  PricingDetails,
  PricingParams,
  PricingRule,
} from '../interfaces/pricing-interfaces'

export class DestinationFeeRule implements PricingRule {
  apply(details: PricingDetails, params: PricingParams): void {
    let countryFeeRate = 0.15
    let countryFeeName = 'International shipping fee'

    const upperCountry = params.destinationCountry.toUpperCase()
    if (upperCountry === 'USA') {
      countryFeeRate = 0.18
      countryFeeName = 'Shipping fee to USA'
    } else if (upperCountry === 'BOLIVIA') {
      countryFeeRate = 0.13
      countryFeeName = 'Shipping fee to Bolivia'
    } else if (upperCountry === 'INDIA') {
      countryFeeRate = 0.19
      countryFeeName = 'Shipping fee to India'
    }

    const countryFeeAmount = params.baseCost * countryFeeRate
    details.increases.push({
      name: countryFeeName,
      amount: countryFeeAmount,
    })
    details.totalCost += countryFeeAmount
  }
}
