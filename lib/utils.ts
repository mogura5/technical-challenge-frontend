import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSplineColor(health: 'positive' | 'negative' | 'neutral'): string {
  if (health === 'positive')
    return '#14d966'
  else if (health === 'negative')
    return '#fa2020'
  
  return '#2eb5f0'
}