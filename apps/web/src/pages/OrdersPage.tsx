import { useMemo, useState } from 'react'
import EmptyState from '../components/orders/EmptyState'
import FilterTabs from '../components/orders/FilterTabs'
import OrderCard from '../components/orders/OrderCard'
import PageHeader from '../components/layout/PageHeader'
import SearchInput from '../components/orders/SearchInput'
import type { FilterStatus, Order } from '../types/order'

interface Props {
  orders: Order[]
}

function matchesFilter(order: Order, filter: FilterStatus): boolean {
  if (filter === 'Semua') return true
  // Diterima bukan tab; ia mengikuti tab Dikirim sebagai badge sementara.
  if (filter === 'Dikirim') return order.status === 'Dikirim' || order.status === 'Diterima'
  return order.status === filter
}

export default function OrdersPage({ orders }: Props) {
  const [filter, setFilter] = useState<FilterStatus>('Semua')
  const [search, setSearch] = useState('')

  const counts = useMemo(
    () => ({
      Semua: orders.length,
      'Belum Bayar': orders.filter((order) => order.status === 'Belum Bayar').length,
      Dikemas: orders.filter((order) => order.status === 'Dikemas').length,
      Dikirim: orders.filter((order) => matchesFilter(order, 'Dikirim')).length,
      Selesai: orders.filter((order) => order.status === 'Selesai').length,
      Dibatalkan: orders.filter((order) => order.status === 'Dibatalkan').length,
    }),
    [orders],
  )

  const visible = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    return orders.filter((order) => {
      if (!matchesFilter(order, filter)) return false
      if (!keyword) return true
      const haystack = [
        order.invoice,
        ...order.items.map((item) => item.name),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(keyword)
    })
  }, [orders, filter, search])

  return (
    <>
      <PageHeader title="Pesanan Saya" subtitle="Filter per status dan cari pesanan dengan cepat." />

      <div className="orders-toolbar">
        <FilterTabs active={filter} counts={counts} onChange={setFilter} />
        <SearchInput value={search} onChange={setSearch} />
      </div>

      {visible.length === 0 ? (
        orders.length === 0 ? (
          <EmptyState
            title="Belum ada pesanan"
            description="Pesanan Anda akan muncul di sini setelah checkout."
            actionLabel="Mulai Belanja"
            onAction={() => window.history.back()}
          />
        ) : (
          <EmptyState
            title="Tidak ada pesanan pada status ini"
            description="Coba ubah filter atau kata kunci pencarian."
            actionLabel="Reset Filter"
            onAction={() => {
              setFilter('Semua')
              setSearch('')
            }}
          />
        )
      ) : (
        <section className="order-list" aria-label="Daftar pesanan">
          {visible.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </section>
      )}
    </>
  )
}
