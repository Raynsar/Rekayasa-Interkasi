import { Clock } from 'lucide-react'
import type { Order } from '../../types/order'
import { hoursUntil } from '../../utils/datetime'

interface Props {
  order: Order
  onComplete: () => void
  onWait: () => void
}

export default function ReminderBanner({ order, onComplete, onWait }: Props) {
  if (!order.autoCompleteAt) return null
  const remaining = Math.max(1, Math.ceil(hoursUntil(order.autoCompleteAt)))

  return (
    <section className="banner banner-info" aria-label="Pengingat selesai otomatis">
      <Clock size={22} aria-hidden="true" />
      <div className="banner-copy">
        <strong>Pesanan akan selesai otomatis dalam {remaining} jam</strong>
        <p>
          Selesaikan sekarang jika paket sudah diterima, atau pilih tunggu
          otomatis. Tanpa pilihan Anda, pesanan tidak akan diselesaikan otomatis.
        </p>
      </div>
      <div className="banner-actions">
        <button type="button" className="btn btn-outline btn-sm" onClick={onWait}>
          Tunggu Otomatis
        </button>
        <button type="button" className="btn btn-primary btn-sm" onClick={onComplete}>
          Selesaikan Sekarang
        </button>
      </div>
    </section>
  )
}
