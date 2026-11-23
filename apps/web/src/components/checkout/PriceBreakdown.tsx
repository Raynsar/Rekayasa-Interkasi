import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { PriceBreakdown as PriceBreakdownType } from '../../types/order'
import { formatRupiah } from '../../utils/format'

interface Props {
  breakdown: PriceBreakdownType
  defaultOpen?: boolean
  title?: string
}

export default function PriceBreakdown({
  breakdown,
  defaultOpen = false,
  title = 'Rincian Biaya',
}: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="price-breakdown">
      <button
        type="button"
        className="breakdown-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="breakdown-toggle-right">
          <strong>{formatRupiah(breakdown.total)}</strong>
          <ChevronDown
            size={20}
            className={open ? 'chevron rotated' : 'chevron'}
            aria-hidden="true"
          />
        </span>
      </button>

      {open && (
        <dl className="breakdown-list">
          {breakdown.lines.map((line) => (
            <div className="breakdown-row" key={line.label}>
              <dt className={line.kind === 'discount' ? 'text-discount' : undefined}>
                {line.label}
              </dt>
              <dd className={line.kind === 'discount' ? 'text-discount' : undefined}>
                {formatRupiah(line.amount)}
              </dd>
            </div>
          ))}
          <div className="breakdown-row breakdown-total">
            <dt>Total akhir</dt>
            <dd>{formatRupiah(breakdown.total)}</dd>
          </div>
        </dl>
      )}
    </section>
  )
}
