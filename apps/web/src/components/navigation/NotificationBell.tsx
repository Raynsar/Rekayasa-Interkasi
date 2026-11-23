import { useState } from 'react'
import { Bell } from 'lucide-react'

export interface NotificationItem {
  id: string
  orderId: string
  title: string
  description: string
  tone: 'warning' | 'info'
}

interface Props {
  items: NotificationItem[]
  onSelect: (orderId: string) => void
}

export default function NotificationBell({ items, onSelect }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="notification-wrap">
      <button
        type="button"
        className="icon-button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={`Notifikasi (${items.length})`}
      >
        <Bell size={20} aria-hidden="true" />
        {items.length > 0 && <span className="notification-badge">{items.length}</span>}
      </button>

      {open && (
        <div className="notification-panel" role="region" aria-label="Daftar notifikasi">
          <h3>Notifikasi</h3>
          {items.length === 0 ? (
            <p className="muted">Tidak ada notifikasi baru.</p>
          ) : (
            items.map((item) => (
              <button
                type="button"
                className={`notification-item tone-${item.tone}`}
                key={item.id}
                onClick={() => {
                  onSelect(item.orderId)
                  setOpen(false)
                }}
              >
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
