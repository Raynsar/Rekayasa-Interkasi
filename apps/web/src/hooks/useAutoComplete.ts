import { useEffect } from 'react'
import type { Order } from '../types/order'

interface Options {
  orders: Order[]
  onDue: (orderId: string) => void
}

/**
 * Auto-selesai HANYA berjalan untuk pesanan yang pengguna pilih "Tunggu
 * Otomatis" (autoOptIn) DAN sudah melewati batas pengingat 24 jam.
 * Tanpa opt-in, tidak ada auto-selesai (AC-007 / AGENTS.md §6.2).
 */
export function useAutoComplete({ orders, onDue }: Options): void {
  useEffect(() => {
    const check = () => {
      const now = Date.now()
      for (const order of orders) {
        if (
          order.autoOptIn &&
          order.status === 'Diterima' &&
          order.autoCompleteAt &&
          new Date(order.autoCompleteAt).getTime() <= now
        ) {
          onDue(order.id)
        }
      }
    }

    check()
    const timer = window.setInterval(check, 30_000)
    return () => window.clearInterval(timer)
  }, [orders, onDue])
}
