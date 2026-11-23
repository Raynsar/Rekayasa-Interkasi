import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buildNotifications } from '../services/notifications'
import { isDeliveryArray } from '../services/validators'
import type { NotificationDelivery } from '../types/notification'
import type { Order } from '../types/order'
import { usePersistentState } from './usePersistentState'
import type { ToastType } from './useToasts'

interface Options {
  orders: Order[]
  notifyDelay: boolean
  onError: (message: string) => void
  push: (message: string, type?: ToastType) => void
}

export interface NotificationView {
  id: string
  orderId: string
  type: 'delay' | 'reminder'
  title: string
  description: string
  failed: boolean
  reason?: string
}

/** Deteksi keterlambatan/pengingat + pencatatan pengiriman & kegagalannya. */
export function useNotifications({ orders, notifyDelay, onError, push }: Options) {
  const items = useMemo(() => buildNotifications(orders, notifyDelay), [orders, notifyDelay])
  const [deliveries, setDeliveries] = usePersistentState<NotificationDelivery[]>(
    'notification-deliveries',
    [],
    onError,
    isDeliveryArray,
  )
  const [failures, setFailures] = useState<NotificationDelivery[]>([])
  const processedRef = useRef<Set<string>>(new Set())
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const delivered = new Set(
      deliveries.filter((entry) => entry.status === 'delivered').map((entry) => entry.id),
    )
    const pending = items.filter(
      (item) => !processedRef.current.has(item.id) && !delivered.has(item.id),
    )
    if (pending.length === 0) return

    for (const item of pending) processedRef.current.add(item.id)
    const timestamp = new Date().toISOString()
    const next: NotificationDelivery[] = [
      ...deliveries,
      ...pending.map((item) => ({
        id: item.id,
        status: 'delivered' as const,
        createdAt: timestamp,
      })),
    ]

    if (setDeliveries(next)) {
      const pendingIds = new Set(pending.map((item) => item.id))
      setFailures((current) => current.filter((entry) => !pendingIds.has(entry.id)))
      for (const item of pending) {
        if (item.type === 'delay') push(`${item.title}. ${item.description}`, 'warning')
      }
    } else {
      const pendingIds = new Set(pending.map((item) => item.id))
      setFailures((current) => [
        ...current.filter((entry) => !pendingIds.has(entry.id)),
        ...pending.map((item) => ({
          id: item.id,
          status: 'failed' as const,
          reason: 'Penyimpanan notifikasi gagal',
          createdAt: timestamp,
        })),
      ])
      // Data pesanan sengaja tidak diubah (AC-021).
      push('Notifikasi gagal dicatat. Data pesanan tidak berubah.', 'error')
    }
  }, [items, deliveries, setDeliveries, push, retryCount])

  const retry = useCallback((id: string) => {
    processedRef.current.delete(id)
    setRetryCount((count) => count + 1)
  }, [])

  const notifications: NotificationView[] = items.map((item) => ({
    id: item.id,
    orderId: item.orderId,
    type: item.type,
    title: item.title,
    description: item.description,
    failed: failures.some((entry) => entry.id === item.id),
    reason: failures.find((entry) => entry.id === item.id)?.reason,
  }))

  return { notifications, retry }
}
