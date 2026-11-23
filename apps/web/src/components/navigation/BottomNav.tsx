import { NavLink } from 'react-router-dom'
import { House, Package, ShoppingCart, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const items: { to: string; label: string; icon: LucideIcon; end?: boolean }[] = [
  { to: '/', label: 'Beranda', icon: House, end: true },
  { to: '/orders', label: 'Pesanan', icon: Package },
  { to: '/cart', label: 'Keranjang', icon: ShoppingCart },
  { to: '/account', label: 'Akun', icon: UserRound },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navigasi bawah">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => (isActive ? 'bottom-link active' : 'bottom-link')}
        >
          <Icon size={20} aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
