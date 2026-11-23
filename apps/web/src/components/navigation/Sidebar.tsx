import { NavLink } from 'react-router-dom'
import { House, Package, ShoppingCart, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const items: { to: string; label: string; icon: LucideIcon; end?: boolean }[] = [
  { to: '/', label: 'Beranda', icon: House, end: true },
  { to: '/orders', label: 'Pesanan', icon: Package },
  { to: '/cart', label: 'Keranjang', icon: ShoppingCart },
  { to: '/account', label: 'Akun', icon: UserRound },
]

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Navigasi utama">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          S
        </span>
        <span>BelanjaKu</span>
      </div>
      <nav>
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <Icon size={20} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <p className="sidebar-footnote">Varian B — PRD + UX Skill</p>
    </aside>
  )
}
