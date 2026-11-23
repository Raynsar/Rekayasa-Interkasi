import { X } from 'lucide-react'

interface Props {
  onClose: () => void
  eyebrow?: string
  title?: string
}

export default function AdBanner({
  onClose,
  eyebrow = 'Iklan',
  title = 'Belanja kebutuhan kuliah dengan harga final sejak awal',
}: Props) {
  return (
    <aside className="ad-banner" aria-label="Area iklan">
      <div className="ad-copy">
        <span className="ad-eyebrow">{eyebrow}</span>
        <strong>{title}</strong>
        <span className="ad-hint">Harga tertera sudah termasuk ongkir & biaya layanan.</span>
      </div>
      <button
        type="button"
        className="ad-close"
        onClick={onClose}
        aria-label="Tutup iklan"
        title="Tutup iklan"
      >
        <X size={20} aria-hidden="true" />
      </button>
    </aside>
  )
}
