import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import EmptyState from '../components/orders/EmptyState'
import ReportForm from '../components/forms/ReportForm'
import type { Order } from '../types/order'
import type { ReportDraft } from '../types/report'

interface Props {
  orders: Order[]
  draft: ReportDraft
  onChange: (patch: Partial<ReportDraft>) => void
  onSubmit: (orderId: string, draft: ReportDraft) => void
}

export default function ReportPage({ orders, draft, onChange, onSubmit }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = orders.find((candidate) => candidate.id === id)

  if (!order) {
    return (
      <>
        <PageHeader title="Laporkan Masalah" backTo="/orders" />
        <EmptyState
          title="Pesanan tidak ditemukan"
          description="Laporan hanya dapat dibuat untuk pesanan yang valid."
          actionLabel="Kembali ke Pesanan"
          onAction={() => navigate('/orders')}
        />
      </>
    )
  }

  return (
    <>
      <PageHeader title="Laporkan Masalah" backTo={`/orders/${order.id}`} backLabel="Detail Pesanan" />

      {order.reportTicket ? (
        <section className="panel success-panel">
          <CheckCircle2 size={40} aria-hidden="true" />
          <h2>Laporan Anda diterima</h2>
          <p>Simpan nomor tiket berikut untuk referensi.</p>
          <strong className="ticket-number">{order.reportTicket}</strong>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            Kembali ke Detail Pesanan
          </button>
        </section>
      ) : (
        <section className="panel report-panel">
          <ReportForm
            order={order}
            draft={draft}
            onChange={onChange}
            onCancel={() => navigate(`/orders/${order.id}`)}
            onSubmit={(value) => onSubmit(order.id, value)}
          />
        </section>
      )}
    </>
  )
}
