import type { CartLine } from '../types/cart'
import type { NotificationDelivery } from '../types/notification'
import type { Order } from '../types/order'
import type { ReportDraft } from '../types/report'

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isOrderArray(value: unknown): value is Order[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isObject(item) &&
        typeof item.id === 'string' &&
        typeof item.status === 'string' &&
        Array.isArray(item.items) &&
        isObject(item.breakdown) &&
        typeof item.breakdown.total === 'number',
    )
  )
}

export function isCartArray(value: unknown): value is CartLine[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isObject(item) &&
        typeof item.productId === 'string' &&
        typeof item.quantity === 'number' &&
        typeof item.unitPriceAtAdd === 'number',
    )
  )
}

export function isDeliveryArray(value: unknown): value is NotificationDelivery[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isObject(item) &&
        typeof item.id === 'string' &&
        (item.status === 'delivered' || item.status === 'failed'),
    )
  )
}

export function isDraftMap(value: unknown): value is Record<string, ReportDraft> {
  return (
    isObject(value) &&
    Object.values(value).every(
      (draft) =>
        isObject(draft) &&
        typeof draft.category === 'string' &&
        typeof draft.description === 'string',
    )
  )
}

export function isNumberMap(value: unknown): value is Record<string, number> {
  return (
    isObject(value) && Object.values(value).every((entry) => typeof entry === 'number')
  )
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export interface AdFrequencyState {
  dayKey: string
  impressions: number
  dismissedAt?: string
}

export function isAdFrequencyState(value: unknown): value is AdFrequencyState {
  return (
    isObject(value) &&
    typeof value.dayKey === 'string' &&
    typeof value.impressions === 'number' &&
    (value.dismissedAt === undefined || typeof value.dismissedAt === 'string')
  )
}
