import { FILTER_STATUSES } from '../../types/order'
import type { FilterStatus } from '../../types/order'

interface Props {
  active: FilterStatus
  counts: Record<FilterStatus, number>
  onChange: (status: FilterStatus) => void
}

export default function FilterTabs({ active, counts, onChange }: Props) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Filter status pesanan">
      {FILTER_STATUSES.map((status) => (
        <button
          key={status}
          type="button"
          role="tab"
          aria-selected={active === status}
          className={active === status ? 'filter-tab active' : 'filter-tab'}
          onClick={() => onChange(status)}
        >
          {status}
          <span className="filter-count">{counts[status]}</span>
        </button>
      ))}
    </div>
  )
}
