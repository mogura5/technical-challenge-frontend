import dayjs from "dayjs";
import type { HealthValue } from "~/types"

export default defineEventHandler(async (event) => {
  // Simulate 1000ms delay.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Throw error if param `error` is `true`.
  const hasError = getQuery(event)?.error
  if (hasError === 'true')
    throw createError({
      statusCode: 404,
      statusMessage: 'Error handled successfully.'
    })

  // Otherwise return data.
  const retentionRateData = generateData({ type: 'percentage' })
  const transactionsData = generateData({ type: 'number' })
  const revenueData = generateData({ type: 'currency' })

  return {
    retention_rate: {
      data: retentionRateData,
      health: getHealthValue(retentionRateData),
    },
    transactions: {
      data: transactionsData,
      health: getHealthValue(transactionsData),
    },
    revenue: {
      data: revenueData,
      health: getHealthValue(revenueData),
    }
  }
})

type DataType = 'percentage' | 'number' | 'currency'

function generateData({ days = 7, type = 'number' }: { days?: number, type?: DataType }) {
  const today = dayjs()
  const data: [string, number][] = []

  Array.from({ length: days }).forEach((_day, index) => data.push([today.subtract(index, 'days').toISOString(), generateDataValue(type)]))

  return data
}

function generateDataValue(type: DataType = 'number'): number {
  if (type === 'percentage')
    return Math.random()
  if (type === 'currency')
    return Number((Math.random() * 10000).toFixed(2))
  return Math.random() * 10000
}

export function getHealthValue(data: [string, number][] | undefined): HealthValue {
  if (!data)
    return 'neutral'
  const flatValues = data.map(value => value[1])
  const minValue = Math.min(...flatValues)
  const maxValue = Math.max(...flatValues)
  const startValue = data[data.length - 1][1]
  const endValue = data[0][1]

  const startComparison = ((startValue - minValue) / (maxValue - minValue) * 100)
  const endComparison = ((endValue - minValue) / (maxValue - minValue) * 100)
  const comparisonValue = Math.abs(startComparison - endComparison)

  if (startComparison < endComparison && comparisonValue >= 20)
    return 'positive'
  if (startComparison > endComparison && comparisonValue >= 20)
    return 'negative'
  return 'neutral'
}