import { AlertTriangle, LifeBuoy } from 'lucide-react'
import type { Order } from '../../types/order'
import { delayedDays } from '../../utils/datetime'

interface Props {
  order: Order
  onReport: () => void
}

export default function DelayBanner({ order, onReport }: Props) {
  return (
    <section className="banner banner-warning" role="alert">
      <AlertTriangle size={22} aria-hidden="true" />
      <div className="banner-copy">
        <strong>Pengiriman terlambat {delayedDays(order)} hari</strong>
        <p>
          Status saat ini: {order.status}. Langkah berikutnya: periksa riwayat
          pengiriman atau ajukan laporan dari pesanan ini.
        </p>
      </div>
      <button type="button" className="btn btn-outline btn-sm" onClick={onReport}>
        <LifeBuoy size={16} aria-hidden="true" />
        Laporkan Masalah
      </button>
    </section>
  )
}
