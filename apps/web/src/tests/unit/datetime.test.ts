import { describe, expect, it } from 'vitest'
import { daysBetween, delayedDays, estimateRangeLabel, hoursUntil, isDelayed, isReminderDue } from '../../utils/datetime'
import { makeOrder } from '../helpers'

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

describe('datetime — AC-007/AC-018/AC-019', () => {
  it('hoursUntil menghitung selisih jam secara presisi', () => {
    const now = new Date('2026-11-23T00:00:00.000Z')
    expect(hoursUntil('2026-11-24T00:00:00.000Z', now)).toBe(24)
    expect(hoursUntil('2026-11-22T12:00:00.000Z', now)).toBe(-12)
  })

  it('estimateRangeLabel menampilkan rentang hari', () => {
    const now = Date.now()
    const order = makeOrder(
      {
        createdAt: new Date(now).toISOString(),
        estimateStart: new Date(now + 2 * DAY).toISOString(),
        estimateEnd: new Date(now + 5 * DAY).toISOString(),
      },
      now,
    )
    expect(estimateRangeLabel(order)).toBe('2–5 hari')
    expect(daysBetween(order.createdAt, order.estimateEnd)).toBe(5)
  })

  it('isDelayed hanya aktif setelah batas akhir dan bukan pada status final', () => {
    const now = Date.now()
    const active = makeOrder({ status: 'Dikirim', estimateEnd: new Date(now - DAY).toISOString() }, now)
    const future = makeOrder({ status: 'Dikirim', estimateEnd: new Date(now + DAY).toISOString() }, now)
    const done = makeOrder({ status: 'Selesai', estimateEnd: new Date(now - DAY).toISOString() }, now)

    expect(isDelayed(active, new Date(now))).toBe(true)
    expect(isDelayed(future, new Date(now))).toBe(false)
    expect(isDelayed(done, new Date(now))).toBe(false)
    expect(delayedDays(active, new Date(now))).toBeGreaterThanOrEqual(1)
  })

  it('isReminderDue aktif 0–24 jam sebelum batas, hanya tanpa opt-in', () => {
    const now = Date.now()
    const soon = makeOrder({ autoCompleteAt: new Date(now + 12 * HOUR).toISOString() }, now)
    const far = makeOrder({ autoCompleteAt: new Date(now + 25 * HOUR).toISOString() }, now)
    const passed = makeOrder({ autoCompleteAt: new Date(now - HOUR).toISOString() }, now)
    const optedIn = makeOrder(
      { autoOptIn: true, autoCompleteAt: new Date(now + 12 * HOUR).toISOString() },
      now,
    )
    const final = makeOrder(
      { status: 'Selesai', autoCompleteAt: new Date(now + 12 * HOUR).toISOString() },
      now,
    )

    expect(isReminderDue(soon, new Date(now))).toBe(true)
    expect(isReminderDue(far, new Date(now))).toBe(false)
    expect(isReminderDue(passed, new Date(now))).toBe(false)
    expect(isReminderDue(optedIn, new Date(now))).toBe(false)
    expect(isReminderDue(final, new Date(now))).toBe(false)
  })
})
