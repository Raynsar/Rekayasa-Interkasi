import { useState } from 'react'
import type { FormEvent } from 'react'
import { FileText, Paperclip, ShieldCheck } from 'lucide-react'
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

const MAX_DESCRIPTION = 1000
const MAX_EVIDENCE_BYTES = 5 * 1024 * 1024

function defaultCategory(status: OrderStatus): string {
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

interface Errors {
  category?: string
  description?: string
  evidence?: string
}

interface Props {
  order: Order
  onSubmit: (draft: ReportDraft) => void
  onCancel: () => void
}

export default function ReportForm({ order, onSubmit, onCancel }: Props) {
  const [category, setCategory] = useState(defaultCategory(order.status))
  const [description, setDescription] = useState('')
  const [evidenceName, setEvidenceName] = useState('')
  const [evidenceSize, setEvidenceSize] = useState<number | undefined>()
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Errors = {}

    if (!category) nextErrors.category = 'Kategori wajib dipilih.'
    if (!description.trim()) nextErrors.description = 'Deskripsi wajib diisi.'
    else if (description.length > MAX_DESCRIPTION)
      nextErrors.description = `Deskripsi maksimal ${MAX_DESCRIPTION} karakter.`
    if (evidenceSize !== undefined && evidenceSize > MAX_EVIDENCE_BYTES)
      nextErrors.evidence = 'Ukuran bukti maksimal 5MB.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({ category, description: description.trim(), evidenceName, evidenceSize })
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
          value={category}
          onChange={(event) => setCategory(event.target.value)}
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
          value={description}
          onChange={(event) => setDescription(event.target.value)}
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
            {description.length}/{MAX_DESCRIPTION}
          </span>
        </div>
      </div>

      <div className="field">
        <label htmlFor="report-evidence">Bukti (opsional)</label>
        <label className="file-picker" htmlFor="report-evidence">
          <Paperclip size={18} aria-hidden="true" />
          {evidenceName || 'Pilih gambar atau dokumen'}
        </label>
        <input
          id="report-evidence"
          type="file"
          accept="image/*,.pdf"
          onChange={(event) => {
            const file = event.target.files?.[0]
            setEvidenceName(file?.name ?? '')
            setEvidenceSize(file?.size)
          }}
        />
        {errors.evidence ? (
          <span className="field-error">{errors.evidence}</span>
        ) : (
          <span className="field-hint">Maksimal 5MB</span>
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
