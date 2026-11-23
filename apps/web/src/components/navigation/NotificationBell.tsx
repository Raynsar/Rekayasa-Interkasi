import { useState } from 'react'
import { AlertCircle, Bell, RotateCcw } from 'lucide-react'

export interface NotificationItem {
  id: string
  orderId: string
  title: string
  description: string
  tone: 'warning' | 'info'
  failed?: boolean
  reason?: string
}

interface Props {
  items: NotificationItem[]
  onSelect: (orderId: string) => void
  onRetry?: (id: string) => void
}

export default function NotificationBell({ items, onSelect, onRetry }: Props) {
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
              <div
                className={`notification-item tone-${item.tone}${item.failed ? ' delivery-failed' : ''}`}
                key={item.id}
              >
                <button
                  type="button"
                  className="notification-open"
                  onClick={() => {
                    onSelect(item.orderId)
                    setOpen(false)
                  }}
                >
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </button>
                {item.failed && (
                  <div className="notification-failure">
                    <span>
                      <AlertCircle size={14} aria-hidden="true" />
                      Gagal dicatat: {item.reason ?? 'tidak diketahui'}
                    </span>
                    {onRetry && (
                      <button type="button" onClick={() => onRetry(item.id)}>
                        <RotateCcw size={14} aria-hidden="true" />
                        Coba lagi
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
