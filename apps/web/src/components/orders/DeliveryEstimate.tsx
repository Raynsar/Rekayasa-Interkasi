import { Truck } from 'lucide-react'
import type { Order } from '../../types/order'
import { estimateRangeLabel, isDelayed, delayedDays } from '../../utils/datetime'
import { formatDate } from '../../utils/format'

export default function DeliveryEstimate({ order }: { order: Order }) {
  const delayed = isDelayed(order)

  return (
    <section className="estimate-card" aria-label="Estimasi pengiriman">
      <Truck size={22} aria-hidden="true" />
      <div>
        <span className="estimate-label">Estimasi tiba</span>
        <strong>{estimateRangeLabel(order)}</strong>
        <span className="estimate-detail">
          {delayed
            ? `Terlambat ${delayedDays(order)} hari · batas ${formatDate(order.estimateEnd)}`
            : `Batas akhir ${formatDate(order.estimateEnd)}`}
        </span>
      </div>
    </section>
  )
}
