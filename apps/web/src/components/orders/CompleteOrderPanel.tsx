import { CheckCircle2, CreditCard, Flag, PackageCheck } from 'lucide-react'
import type { Order } from '../../types/order'

interface Props {
  order: Order
  onRequestComplete: () => void
  onReport: () => void
  onPay: () => void
}

export default function CompleteOrderPanel({
  order,
  onRequestComplete,
  onReport,
  onPay,
}: Props) {
  const canComplete = order.status === 'Diterima'
  const isDone = order.status === 'Selesai'

  return (
    <section className="complete-panel" aria-label="Aksi pesanan">
      <div className="complete-panel-heading">
        <PackageCheck size={22} aria-hidden="true" />
        <div>
          <strong>Kontrol pesanan</strong>
          <p>
            {isDone
              ? 'Pesanan selesai. Cicilan SPayLater siap dilunasi.'
              : canComplete
                ? 'Paket sudah diterima. Anda yang menentukan kapan pesanan selesai.'
                : 'Aksi tersedia setelah paket diterima.'}
          </p>
        </div>
      </div>

      <div className="complete-actions">
        {canComplete && (
          <button type="button" className="btn btn-primary" onClick={onRequestComplete}>
            <CheckCircle2 size={18} aria-hidden="true" />
            Selesaikan Pesanan
          </button>
        )}
        {isDone && order.installmentRemaining && order.installmentRemaining > 0 && (
          <button type="button" className="btn btn-primary" onClick={onPay}>
            <CreditCard size={18} aria-hidden="true" />
            Lunasi Sekarang
          </button>
        )}
        {!isDone && order.status !== 'Belum Bayar' && order.status !== 'Dibatalkan' && (
          <button type="button" className="btn btn-outline" onClick={onReport}>
            <Flag size={18} aria-hidden="true" />
            Laporkan Masalah
          </button>
        )}
      </div>
    </section>
  )
}
