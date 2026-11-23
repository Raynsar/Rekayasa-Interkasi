import type { Order } from '../types/order'

const DAY_MS = 24 * 60 * 60 * 1000
const HOUR_MS = 60 * 60 * 1000

export function daysBetween(startIso: string, endIso: string): number {
  return Math.max(1, Math.round((new Date(endIso).getTime() - new Date(startIso).getTime()) / DAY_MS))
}

export function estimateRangeLabel(order: Order): string {
  return `${daysBetween(order.createdAt, order.estimateStart)}–${daysBetween(
    order.createdAt,
    order.estimateEnd,
  )} hari`
}

export function hoursUntil(iso: string, now: Date = new Date()): number {
  return (new Date(iso).getTime() - now.getTime()) / HOUR_MS
}

function isFinal(order: Order): boolean {
  return order.status === 'Selesai' || order.status === 'Dibatalkan'
}

export function isReminderDue(order: Order, now: Date = new Date()): boolean {
  if (!order.autoCompleteAt || isFinal(order)) return false
  if (order.autoOptIn) return false
  const remaining = hoursUntil(order.autoCompleteAt, now)
  return remaining > 0 && remaining <= 24
}

export function isDelayed(order: Order, now: Date = new Date()): boolean {
  if (isFinal(order)) return false
  return now.getTime() > new Date(order.estimateEnd).getTime()
}

export function delayedDays(order: Order, now: Date = new Date()): number {
  const elapsed = now.getTime() - new Date(order.estimateEnd).getTime()
  return Math.max(1, Math.ceil(elapsed / DAY_MS))
}
