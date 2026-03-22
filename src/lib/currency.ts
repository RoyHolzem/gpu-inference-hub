// Currency conversion utilities

const EUR_TO_USD_RATE = 1.08 // Updated March 2026
const USD_TO_EUR_RATE = 1 / EUR_TO_USD_RATE

export type Currency = 'USD' | 'EUR'

export function convertPrice(priceUSD: number, targetCurrency: Currency): number {
  if (targetCurrency === 'USD') {
    return priceUSD
  }
  return priceUSD * USD_TO_EUR_RATE
}

export function formatPrice(priceUSD: number, currency: Currency): string {
  const converted = convertPrice(priceUSD, currency)
  const symbol = currency === 'USD' ? '$' : '€'
  return `${symbol}${converted.toFixed(2)}`
}

export function getCurrencySymbol(currency: Currency): string {
  return currency === 'USD' ? '$' : '€'
}
