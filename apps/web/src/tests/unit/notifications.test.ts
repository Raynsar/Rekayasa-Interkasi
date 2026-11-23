import { describe, expect, it } from 'vitest'
import { buildNotifications } from '../../services/notifications'
import { makeOrder } from '../helpers'

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

describe('buildNotifications — AC-019/AC-020', () => {
  it('membuat satu notifikasi keterlambatan dengan ID unik per pesanan', () => {
    const now = Date.now()
    const delayed = makeOrder(
      { id: 'o-late', status: 'Dikirim', estimateEnd: new Date(now - DAY).toISOString() },
      now,
    )

    const items = buildNotifications([delayed], true, new Date(now))
    expect(items).toHaveLength(1)
    expect(items[0].id).toBe('o-late:delay')
    expect(items[0].description).toMatch(/langkah berikutnya/i)
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length)
  })

  it('ID tetap sama saat dipanggil ulang untuk kondisi yang sama (anti-duplikat)', () => {
    const now = Date.now()
    const delayed = makeOrder(
      { id: 'o-late', estimateEnd: new Date(now - DAY).toISOString() },
      now,
    )

    const first = buildNotifications([delayed], true, new Date(now))
    const second = buildNotifications([delayed], true, new Date(now + DAY))
    expect(second.map((item) => item.id)).toEqual(first.map((item) => item.id))
  })

  it('membuat notifikasi pengingat hanya untuk pesanan tanpa opt-in', () => {
    const now = Date.now()
    const reminder = makeOrder(
      { id: 'o-rem', autoCompleteAt: new Date(now + 12 * HOUR).toISOString() },
      now,
    )
    const optedIn = makeOrder(
      { id: 'o-opt', autoOptIn: true, autoCompleteAt: new Date(now + 12 * HOUR).toISOString() },
      now,
    )

    const items = buildNotifications([reminder, optedIn], false, new Date(now))
    expect(items.map((item) => item.id)).toEqual(['o-rem:reminder'])
  })

  it('tidak membuat notifikasi untuk status final atau saat notifyDelay dimatikan', () => {
    const now = Date.now()
    const done = makeOrder({ status: 'Selesai', estimateEnd: new Date(now - DAY).toISOString() }, now)
    const cancelled = makeOrder(
      { status: 'Dibatalkan', estimateEnd: new Date(now - DAY).toISOString() },
      now,
    )
    const delayed = makeOrder({ estimateEnd: new Date(now - DAY).toISOString() }, now)

    expect(buildNotifications([done, cancelled], true, new Date(now))).toHaveLength(0)
    expect(buildNotifications([delayed], false, new Date(now))).toHaveLength(0)
  })
})
