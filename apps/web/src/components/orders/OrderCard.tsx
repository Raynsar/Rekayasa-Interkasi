import { Link } from 'react-router-dom'
import { ChevronRight, Clock3 } from 'lucide-react'
import type { Order } from '../../types/order'
import { delayedDays, isDelayed } from '../../utils/datetime'
import { formatDateTime, formatRupiah } from '../../utils/format'
import ProductThumb from '../ProductThumb'
import StatusBadge from './StatusBadge'

export default function OrderCard({ order }: { order: Order }) {
  const delayed = isDelayed(order)

  return (
    <article className="order-card">
      <header className="order-card-header">
        <div>
          <span className="caption">{order.invoice}</span>
          <span className="caption"> · {formatDateTime(order.createdAt)}</span>
        </div>
        <StatusBadge status={order.status} />
      </header>

      <div className="order-card-body">
        <div className="order-thumbs">
          {order.items.map((item) => (
            <ProductThumb key={item.productId} icon={item.icon} tone={item.tone} size="sm" />
          ))}
        </div>
        <div className="order-card-info">
          <strong>{order.items[0]?.name}</strong>
          {order.items.length > 1 && (
            <span className="caption">+{order.items.length - 1} produk lainnya</span>
          )}
          {delayed && (
            <span className="delay-chip">
              <Clock3 size={14} aria-hidden="true" />
              Terlambat {delayedDays(order)} hari
            </span>
          )}
        </div>
        <div className="order-card-total">
          <span className="caption">Total</span>
          <strong>{formatRupiah(order.breakdown.total)}</strong>
        </div>
      </div>

      <footer className="order-card-footer">
        <Link className="btn btn-outline btn-sm" to={`/orders/${order.id}`}>
          Lihat Detail
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
      </footer>
    </article>
  )
}
