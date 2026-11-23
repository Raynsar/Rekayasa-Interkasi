import type { OrderStatus } from '../../types/order'

const classNames: Record<OrderStatus, string> = {
  'Belum Bayar': 'belum-bayar',
  Dikemas: 'dikemas',
  Dikirim: 'dikirim',
  Diterima: 'diterima',
  Selesai: 'selesai',
  Dibatalkan: 'dibatalkan',
}

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`status-badge status-${classNames[status]}`}>
      <span aria-hidden="true" className="status-dot" />
      {status}
    </span>
  )
}
