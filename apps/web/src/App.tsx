import { useMemo, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import ToastContainer from './components/feedback/ToastContainer'
import type { NotificationItem } from './components/navigation/NotificationBell'
import { useToasts } from './hooks/useToasts'
import AccountPage from './pages/AccountPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import OrderDetailPage from './pages/OrderDetailPage'
import OrdersPage from './pages/OrdersPage'
import ProductPage from './pages/ProductPage'
import ReportPage from './pages/ReportPage'
import { findProduct, getSeedOrders } from './services/seedData'
import type { CartLine } from './types/cart'
import type { Order, OrderItem } from './types/order'
import type { ReportDraft } from './types/report'
import { isDelayed, isReminderDue } from './utils/datetime'
import { combineBreakdowns, computePriceBreakdown } from './utils/price'

const DAY_MS = 24 * 60 * 60 * 1000
const DELIVERY_ADDRESS = 'Jl. Teknik No. 12, Surabaya, Jawa Timur 60115'

function cartItems(cart: CartLine[]): { line: CartLine; product: NonNullable<ReturnType<typeof findProduct>> }[] {
  return cart.flatMap((line) => {
    const product = findProduct(line.productId)
    return product ? [{ line, product }] : []
  })
}

export default function App() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>(getSeedOrders)
  const [cart, setCart] = useState<CartLine[]>([])
  const [showAds, setShowAds] = useState(true)
  const [notifyDelay, setNotifyDelay] = useState(true)
  const { toasts, push, dismiss } = useToasts()

  const notifications = useMemo<NotificationItem[]>(() => {
    const items: NotificationItem[] = []
    for (const order of orders) {
      if (notifyDelay && isDelayed(order)) {
        items.push({
          id: `${order.id}-delay`,
          orderId: order.id,
          title: `Keterlambatan ${order.invoice}`,
          description: 'Estimasi terlampaui. Lihat langkah berikutnya di detail pesanan.',
          tone: 'warning',
        })
      }
      if (isReminderDue(order)) {
        items.push({
          id: `${order.id}-reminder`,
          orderId: order.id,
          title: `Pengingat ${order.invoice}`,
          description: 'Pesanan akan selesai otomatis dalam 24 jam.',
          tone: 'info',
        })
      }
    }
    return items
  }, [orders, notifyDelay])

  function addToCart(productId: string) {
    const product = findProduct(productId)
    if (!product) return
    setCart((current) => {
      const existing = current.find((line) => line.productId === productId)
      if (existing) {
        return current.map((line) =>
          line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line,
        )
      }
      return [...current, { productId, quantity: 1, unitPriceAtAdd: product.price }]
    })
    push(`${product.name} ditambahkan ke keranjang`, 'success')
  }

  function changeQuantity(productId: string, quantity: number) {
    setCart((current) =>
      quantity <= 0
        ? current.filter((line) => line.productId !== productId)
        : current.map((line) => (line.productId === productId ? { ...line, quantity } : line)),
    )
  }

  function removeFromCart(productId: string) {
    setCart((current) => current.filter((line) => line.productId !== productId))
    push('Item dihapus dari keranjang', 'info')
  }

  function placeOrder(paymentMethod: string) {
    const items = cartItems(cart)
    if (items.length === 0) {
      push('Keranjang kosong. Tambahkan produk terlebih dahulu.', 'error')
      return
    }

    const breakdown = combineBreakdowns(
      items.map(({ product, line }) => computePriceBreakdown({ product, quantity: line.quantity })),
    )
    const now = Date.now()
    const orderItems: OrderItem[] = items.map(({ product, line }) => ({
      productId: product.id,
      name: product.name,
      quantity: line.quantity,
      unitPrice: product.price,
      tone: product.tone,
      icon: product.icon,
    }))

    const order: Order = {
      id: `o-${now}`,
      invoice: `INV/${new Date(now).getFullYear()}${String(new Date(now).getMonth() + 1).padStart(2, '0')}${String(new Date(now).getDate()).padStart(2, '0')}/MPL/${String(orders.length + 1).padStart(3, '0')}`,
      status: 'Dikemas',
      items: orderItems,
      breakdown,
      createdAt: new Date(now).toISOString(),
      estimateStart: new Date(now + 2 * DAY_MS).toISOString(),
      estimateEnd: new Date(now + 4 * DAY_MS).toISOString(),
      autoOptIn: false,
      shipmentEvents: [{ time: new Date(now).toISOString(), title: 'Pesanan dibuat', active: true }],
      address: DELIVERY_ADDRESS,
      courier: 'JNE Reguler',
      paymentMethod,
    }

    setOrders((current) => [order, ...current])
    setCart([])
    push('Pesanan berhasil dibuat', 'success')
    navigate(`/orders/${order.id}`)
  }

  function completeOrder(orderId: string) {
    const target = orders.find((order) => order.id === orderId)
    if (!target || target.status !== 'Diterima') {
      push('Pesanan tidak dapat diselesaikan pada status ini.', 'error')
      return
    }
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status: 'Selesai', autoOptIn: false } : order,
      ),
    )
    push('Pesanan selesai. Cicilan SPayLater dapat dibayar.', 'success')
  }

  function setAutoOptIn(orderId: string, value: boolean) {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, autoOptIn: value } : order)),
    )
    push(
      value
        ? 'Anda memilih tunggu otomatis sampai batas waktu.'
        : 'Pilihan tunggu otomatis dibatalkan.',
      'info',
    )
  }

  function payInstallment(orderId: string) {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, installmentRemaining: 0 } : order,
      ),
    )
    push('Pelunasan cicilan dicatat.', 'success')
  }

  function submitReport(orderId: string, draft: ReportDraft) {
    const ticket = `TKT-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
    const createdAt = new Date().toISOString()
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? { ...order, reportTicket: ticket, report: { ...draft, createdAt } }
          : order,
      ),
    )
    push(`Laporan terkirim · ${ticket}`, 'success')
    navigate(`/orders/${orderId}`)
  }

  return (
    <>
      <AppShell
        notifications={notifications}
        onNotificationSelect={(orderId) => navigate(`/orders/${orderId}`)}
      >
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={addToCart}
                adDismissed={!showAds}
                onDismissAd={() => setShowAds(false)}
              />
            }
          />
          <Route path="/products/:id" element={<ProductPage onAddToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onChangeQuantity={changeQuantity}
                onRemove={removeFromCart}
              />
            }
          />
          <Route path="/checkout" element={<CheckoutPage cart={cart} onPlaceOrder={placeOrder} />} />
          <Route path="/orders" element={<OrdersPage orders={orders} />} />
          <Route
            path="/orders/:id"
            element={
              <OrderDetailPage
                orders={orders}
                onComplete={completeOrder}
                onSetAutoOptIn={setAutoOptIn}
                onPay={payInstallment}
              />
            }
          />
          <Route
            path="/orders/:id/report"
            element={<ReportPage orders={orders} onSubmit={submitReport} />}
          />
          <Route
            path="/account"
            element={
              <AccountPage
                showAds={showAds}
                notifyDelay={notifyDelay}
                onToggleAds={setShowAds}
                onToggleNotifyDelay={setNotifyDelay}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppShell>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  )
}
