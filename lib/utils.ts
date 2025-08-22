import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSplineColor(health: 'positive' | 'negative' | 'neutral'): string {
  switch (health) {
    case 'positive':
      return '#14d966'
    case 'negative':
      return '#fa2020'
    case 'neutral':
      return '#2eb5f0'
  }
}

export function getFormat(key: 'transactions' | 'revenue' | 'retention_rate'): NUMBER_FORMAT {
  switch (key) {
    case 'transactions':
      return NUMBER_FORMAT.NUMBER;
    case 'revenue':
      return NUMBER_FORMAT.USD;
    case 'retention_rate':
      return NUMBER_FORMAT.PERCENTAGE;
    default:
      return NUMBER_FORMAT.NUMBER;
  }
}

export enum NUMBER_FORMAT {
  USD = 'usd',
  PERCENTAGE = 'percentage',
  NUMBER ='number',
}

export const FormattingValues = {
  usd(value: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  },
  percentage(value: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      maximumFractionDigits: 2,
    }).format(value)
  },
  humanNumber(value: number) {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(value)
  }
}