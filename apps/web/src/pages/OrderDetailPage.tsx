import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, MapPin, Ticket } from 'lucide-react'
import PriceBreakdown from '../components/checkout/PriceBreakdown'
import CompleteOrderPanel from '../components/orders/CompleteOrderPanel'
import DeliveryEstimate from '../components/orders/DeliveryEstimate'
import EmptyState from '../components/orders/EmptyState'
import PageHeader from '../components/layout/PageHeader'
import ProductThumb from '../components/ProductThumb'
import ShippingTimeline from '../components/orders/ShippingTimeline'
import StatusBadge from '../components/orders/StatusBadge'
import ConfirmModal from '../components/feedback/ConfirmModal'
import DelayBanner from '../components/feedback/DelayBanner'
import ReminderBanner from '../components/feedback/ReminderBanner'
import type { Order } from '../types/order'
import { isDelayed, isReminderDue } from '../utils/datetime'
import { formatDateTime, formatRupiah } from '../utils/format'

interface Props {
  orders: Order[]
  onComplete: (orderId: string) => void
  onSetAutoOptIn: (orderId: string, value: boolean) => void
  onPay: (orderId: string) => void
}

export default function OrderDetailPage({
  orders,
  onComplete,
  onSetAutoOptIn,
  onPay,
}: Props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const order = orders.find((candidate) => candidate.id === id)

  if (!order) {
    return (
      <>
        <PageHeader title="Detail Pesanan" backTo="/orders" />
        <EmptyState
          title="Pesanan tidak ditemukan"
          description="Pesanan mungkin sudah dihapus atau tautannya tidak valid."
          actionLabel="Kembali ke Pesanan"
          onAction={() => navigate('/orders')}
        />
      </>
    )
  }

  const delayed = isDelayed(order)
  const reminderDue = isReminderDue(order)

  return (
    <>
      <PageHeader title="Detail Pesanan" backTo="/orders" />

      <section className="detail-heading panel">
        <div>
          <span className="caption">{order.invoice}</span>
          <h2>{order.items[0]?.name}</h2>
          <span className="caption">Dibuat {formatDateTime(order.createdAt)}</span>
        </div>
        <StatusBadge status={order.status} />
      </section>

      {delayed && <DelayBanner order={order} onReport={() => navigate(`/orders/${order.id}/report`)} />}
      {reminderDue && (
        <ReminderBanner
          order={order}
          onComplete={() => setConfirmOpen(true)}
          onWait={() => onSetAutoOptIn(order.id, true)}
        />
      )}
      {order.autoOptIn && order.status === 'Diterima' && (
        <div className="banner banner-info" role="status">
          <CheckCircle2 size={20} aria-hidden="true" />
          <div className="banner-copy">
            <strong>Anda memilih tunggu otomatis</strong>
            <p>Pesanan akan diselesaikan otomatis pada batas waktu. Anda tetap bisa menyelesaikan manual.</p>
          </div>
        </div>
      )}
      {order.autoCompleted && (
        <div className="banner banner-success" role="status">
          <CheckCircle2 size={20} aria-hidden="true" />
          <div className="banner-copy">
            <strong>Selesai otomatis sesuai pilihan Anda</strong>
            <p>Diselesaikan pada {formatDateTime(order.completedAt ?? order.createdAt)}.</p>
          </div>
        </div>
      )}

      <div className="detail-layout">
        <div className="detail-main">
          <section className="panel">
            <h2>Produk</h2>
            {order.items.map((item) => (
              <div className="detail-item" key={item.productId}>
                <ProductThumb icon={item.icon} tone={item.tone} />
                <div>
                  <strong>{item.name}</strong>
                  <span className="caption">{item.quantity} item · {formatRupiah(item.unitPrice)}</span>
                </div>
              </div>
            ))}
          </section>

          <section className="panel">
            <h2>Pelacakan</h2>
            <DeliveryEstimate order={order} />
            <ShippingTimeline events={order.shipmentEvents} />
          </section>

          <section className="panel">
            <h2>Informasi pengiriman</h2>
            <p className="address-line">
              <MapPin size={18} aria-hidden="true" />
              {order.address}
            </p>
            <p className="muted">Kurir: {order.courier}</p>
            <p className="muted">Pembayaran: {order.paymentMethod}</p>
          </section>
        </div>

        <aside className="detail-side">
          <section className="panel">
            <h2>Rincian biaya</h2>
            <PriceBreakdown breakdown={order.breakdown} defaultOpen />
          </section>

          {order.reportTicket && (
            <section className="panel ticket-panel">
              <Ticket size={20} aria-hidden="true" />
              <div>
                <strong>Laporan diterima</strong>
                <p>Nomor tiket: {order.reportTicket}</p>
              </div>
            </section>
          )}

          <CompleteOrderPanel
            order={order}
            onRequestComplete={() => setConfirmOpen(true)}
            onReport={() => navigate(`/orders/${order.id}/report`)}
            onPay={() => onPay(order.id)}
          />
        </aside>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Selesaikan pesanan ini?"
        message="Pastikan paket sudah kamu terima. Setelah selesai, status tidak dapat dikembalikan."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          onComplete(order.id)
          setConfirmOpen(false)
        }}
      />
    </>
  )
}
