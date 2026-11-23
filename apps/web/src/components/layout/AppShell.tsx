import type { ReactNode } from 'react'
import Sidebar from '../navigation/Sidebar'
import BottomNav from '../navigation/BottomNav'
import NotificationBell from '../navigation/NotificationBell'
import type { NotificationItem } from '../navigation/NotificationBell'

interface Props {
  children: ReactNode
  notifications: NotificationItem[]
  onNotificationSelect: (orderId: string) => void
  onNotificationRetry: (id: string) => void
}

export default function AppShell({
  children,
  notifications,
  onNotificationSelect,
  onNotificationRetry,
}: Props) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <header className="topbar">
          <div className="topbar-title">
            <span className="topbar-brand">BelanjaKu</span>
            <span className="topbar-subtitle">Pelacakan pesanan</span>
          </div>
          <NotificationBell
            items={notifications}
            onSelect={onNotificationSelect}
            onRetry={onNotificationRetry}
          />
        </header>
        <main className="app-content">{children}</main>
      </div>
      <BottomNav />
    </div>
  )
}
