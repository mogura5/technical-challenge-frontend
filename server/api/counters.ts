import dayjs from "dayjs";

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
  return {
    retention_rate: {
      data: generateData({ type: 'percentage' }),
    },
    transactions: {
      data: generateData({ type: 'number' }),
    },
    revenue: {
      data: generateData({ type: 'currency' }),
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