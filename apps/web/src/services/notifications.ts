import type { NotificationItemModel } from '../types/notification'
import type { Order } from '../types/order'
import { isDelayed, isReminderDue } from '../utils/datetime'

/**
 * Notifikasi diturunkan dari pesanan, bukan disimpan duplikat per pesanan.
 * ID `${orderId}:${kind}` menjamin satu notifikasi per kondisi (AC-020).
 */
export function buildNotifications(
  orders: Order[],
  notifyDelay: boolean,
  now: Date = new Date(),
): NotificationItemModel[] {
  const items: NotificationItemModel[] = []

  for (const order of orders) {
    const final = order.status === 'Selesai' || order.status === 'Dibatalkan'
    if (final) continue

    if (notifyDelay && isDelayed(order, now)) {
      items.push({
        id: `${order.id}:delay`,
        orderId: order.id,
        type: 'delay',
        title: `Keterlambatan ${order.invoice}`,
        description: 'Estimasi terlampaui. Lihat langkah berikutnya di detail pesanan.',
        createdAt: now.toISOString(),
      })
    }

    if (isReminderDue(order, now)) {
      items.push({
        id: `${order.id}:reminder`,
        orderId: order.id,
        type: 'reminder',
        title: `Pengingat ${order.invoice}`,
        description: 'Selesaikan sekarang atau pilih tunggu otomatis dalam 24 jam.',
        createdAt: now.toISOString(),
      })
    }
  }

  return items
}
