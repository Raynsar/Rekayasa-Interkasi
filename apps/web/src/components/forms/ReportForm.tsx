import { useState } from 'react'
import type { FormEvent } from 'react'
import { FileText, Paperclip, ShieldCheck } from 'lucide-react'
import {
  hasReportErrors,
  MAX_DESCRIPTION,
  validateReportDraft,
} from '../../services/report'
import type { ReportErrors } from '../../services/report'
import type { Order, OrderStatus } from '../../types/order'
import type { ReportDraft } from '../../types/report'
import StatusBadge from '../orders/StatusBadge'

const CATEGORIES = [
  'Paket belum diterima',
  'Pesanan tidak diproses',
  'Masalah pembayaran',
  'Masalah setelah selesai',
  'Pesanan dibatalkan',
  'Lainnya',
]

export function defaultCategory(status: OrderStatus): string {
  switch (status) {
    case 'Dikirim':
    case 'Diterima':
      return 'Paket belum diterima'
    case 'Dikemas':
      return 'Pesanan tidak diproses'
    case 'Belum Bayar':
      return 'Masalah pembayaran'
    case 'Selesai':
      return 'Masalah setelah selesai'
    case 'Dibatalkan':
      return 'Pesanan dibatalkan'
  }
}

export function emptyDraft(order: Order): ReportDraft {
  return {
    category: defaultCategory(order.status),
    description: '',
    evidenceName: '',
    evidenceSize: undefined,
  }
}

interface Props {
  order: Order
  draft: ReportDraft
  onChange: (patch: Partial<ReportDraft>) => void
  onSubmit: (draft: ReportDraft) => void
  onCancel: () => void
}

export default function ReportForm({ order, draft, onChange, onSubmit, onCancel }: Props) {
  const [errors, setErrors] = useState<ReportErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateReportDraft(draft)

    setErrors(nextErrors)
    if (hasReportErrors(nextErrors)) return

    onSubmit({ ...draft, description: draft.description.trim() })
  }

  return (
    <form className="report-form" onSubmit={handleSubmit} noValidate>
      <section className="auto-attached">
        <ShieldCheck size={20} aria-hidden="true" />
        <div>
          <strong>Detail pesanan otomatis terlampir</strong>
          <p>
            {order.invoice} · <StatusBadge status={order.status} />
          </p>
        </div>
      </section>

      <div className="field">
        <label htmlFor="report-category">Kategori masalah</label>
        <select
          id="report-category"
          value={draft.category}
          onChange={(event) => {
            onChange({ category: event.target.value })
            setErrors((current) => ({ ...current, category: undefined }))
          }}
          aria-invalid={Boolean(errors.category)}
        >
          {CATEGORIES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.category && <span className="field-error">{errors.category}</span>}
      </div>

      <div className="field">
        <label htmlFor="report-description">Deskripsi</label>
        <textarea
          id="report-description"
          rows={5}
          maxLength={MAX_DESCRIPTION}
          value={draft.description}
          onChange={(event) => {
            onChange({ description: event.target.value })
            setErrors((current) => ({ ...current, description: undefined }))
          }}
          placeholder="Jelaskan masalah yang Anda alami..."
          aria-invalid={Boolean(errors.description)}
        />
        <div className="field-meta">
          {errors.description ? (
            <span className="field-error">{errors.description}</span>
          ) : (
            <span>Wajib diisi</span>
          )}
          <span>
            {draft.description.length}/{MAX_DESCRIPTION}
          </span>
        </div>
      </div>

      <div className="field">
        <label htmlFor="report-evidence">Bukti (opsional)</label>
        <label className="file-picker" htmlFor="report-evidence">
          <Paperclip size={18} aria-hidden="true" />
          {draft.evidenceName || 'Pilih gambar atau dokumen'}
        </label>
        <input
          id="report-evidence"
          type="file"
          accept="image/*,.pdf"
          onChange={(event) => {
            const file = event.target.files?.[0]
            onChange({ evidenceName: file?.name ?? '', evidenceSize: file?.size })
            setErrors((current) => ({ ...current, evidence: undefined }))
          }}
        />
        {errors.evidence ? (
          <span className="field-error">{errors.evidence}</span>
        ) : (
          <span className="field-hint">Maksimal 5MB · hanya nama & ukuran file yang disimpan</span>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Batal
        </button>
        <button type="submit" className="btn btn-primary">
          <FileText size={18} aria-hidden="true" />
          Kirim Laporan
        </button>
      </div>
    </form>
  )
}
