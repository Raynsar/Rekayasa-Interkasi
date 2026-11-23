import { useCallback, useMemo, useRef } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import ToastContainer from './components/feedback/ToastContainer'
import type { NotificationItem } from './components/navigation/NotificationBell'
import { emptyDraft } from './components/forms/ReportForm'
import { useAdFrequency } from './hooks/useAdFrequency'
import { useAutoComplete } from './hooks/useAutoComplete'
import { useNotifications } from './hooks/useNotifications'
import { usePersistentState } from './hooks/usePersistentState'
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
import { isCartArray, isDraftMap, isNumber, isOrderArray } from './services/validators'
import type { CartLine } from './types/cart'
import type { Order, OrderItem } from './types/order'
import type { ReportDraft } from './types/report'
import { combineBreakdowns, computePriceBreakdown } from './utils/price'

const DAY_MS = 24 * 60 * 60 * 1000
const DELIVERY_ADDRESS = 'Jl. Teknik No. 12, Surabaya, Jawa Timur 60115'

function emptyFallbackDraft(): ReportDraft {
  return { category: '', description: '' }
}

interface ReportRouteProps {
  orders: Order[]
  drafts: Record<string, ReportDraft>
  onChange: (orderId: string, patch: Partial<ReportDraft>) => void
  onSubmit: (orderId: string, draft: ReportDraft) => void
}

function ReportRoute({ orders, drafts, onChange, onSubmit }: ReportRouteProps) {
  const { id } = useParams()
  const orderId = id ?? ''
  const order = orders.find((candidate) => candidate.id === orderId)
  const draft = drafts[orderId] ?? (order ? emptyDraft(order) : emptyFallbackDraft())

  return (
    <ReportPage
      orders={orders}
      draft={draft}
      onChange={(patch) => onChange(orderId, patch)}
      onSubmit={onSubmit}
    />
  )
}

export default function App() {
  const navigate = useNavigate()
  const { toasts, push, dismiss } = useToasts()
  const handleStorageError = useCallback((message: string) => push(message, 'error'), [push])

  const [orders, setOrders] = usePersistentState<Order[]>(
    'orders',
    getSeedOrders,
    handleStorageError,
    isOrderArray,
  )
  const [cart, setCart] = usePersistentState<CartLine[]>(
    'cart',
    [],
    handleStorageError,
    isCartArray,
  )
  const [showAds, setShowAds] = usePersistentState<boolean>(
    'show-ads',
    true,
    handleStorageError,
  )
  const [notifyDelay, setNotifyDelay] = usePersistentState<boolean>(
    'notify-delay',
    true,
    handleStorageError,
  )
  const [drafts, setDrafts] = usePersistentState<Record<string, ReportDraft>>(
    'report-drafts',
    {},
    handleStorageError,
    isDraftMap,
  )
  const [ticketCounter, setTicketCounter] = usePersistentState<number>(
    'ticket-counter',
    0,
    handleStorageError,
    isNumber,
  )

  const { visible: adVisible, dismiss: dismissAd } = useAdFrequency(handleStorageError)
  const { notifications, retry } = useNotifications({
    orders,
    notifyDelay,
    onError: handleStorageError,
    push,
  })

  const completingRef = useRef<Set<string>>(new Set())

  const completeOrder = useCallback(
    (orderId: string, automatic = false): boolean => {
      if (completingRef.current.has(orderId)) return false
      const target = orders.find((order) => order.id === orderId)
      if (!target || target.status !== 'Diterima') {
        if (!automatic) push('Pesanan tidak dapat diselesaikan pada status ini.', 'error')
        return false
      }

      completingRef.current.add(orderId)
      try {
        const completedAt = new Date().toISOString()
        // Tulis gagal => state tidak berubah (AC-039) dan toast error sudah
        // dipancarkan oleh handleStorageError.
        const saved = setOrders((current) =>
          current.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status: 'Selesai',
                  completedAt,
                  autoCompleted: automatic,
                  autoOptIn: false,
                }
              : order,
          ),
        )
        if (!saved) return false

        push(
          automatic
            ? 'Pesanan diselesaikan otomatis sesuai pilihan Anda.'
            : 'Pesanan selesai. Cicilan SPayLater dapat dibayar.',
          'success',
        )
        return true
      } finally {
        completingRef.current.delete(orderId)
      }
    },
    [orders, push, setOrders],
  )

  const handleAutoComplete = useCallback(
    (orderId: string) => {
      completeOrder(orderId, true)
    },
    [completeOrder],
  )
  useAutoComplete({ orders, onDue: handleAutoComplete })

  const bellNotifications = useMemo<NotificationItem[]>(
    () =>
      notifications.map((item) => ({
        id: item.id,
        orderId: item.orderId,
        title: item.title,
        description: item.description,
        tone: item.type === 'delay' ? 'warning' : 'info',
        failed: item.failed,
        reason: item.reason,
      })),
    [notifications],
  )

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
    const priced = cart.flatMap((line) => {
      const product = findProduct(line.productId)
      return product ? [{ line, product }] : []
    })
    if (priced.length === 0) {
      push('Keranjang kosong. Tambahkan produk terlebih dahulu.', 'error')
      return
    }

    const breakdown = combineBreakdowns(
      priced.map(({ product, line }) => computePriceBreakdown({ product, quantity: line.quantity })),
    )
    const now = Date.now()
    const orderItems: OrderItem[] = priced.map(({ product, line }) => ({
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

    if (!setOrders((current) => [order, ...current])) return
    if (!setCart([])) {
      setOrders((current) => current.filter((candidate) => candidate.id !== order.id))
      push('Gagal menyimpan keranjang. Pesanan dibatalkan.', 'error')
      return
    }

    push('Pesanan berhasil dibuat', 'success')
    navigate(`/orders/${order.id}`)
  }

  function setAutoOptIn(orderId: string, value: boolean) {
    const saved = setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, autoOptIn: value } : order)),
    )
    if (!saved) return
    push(
      value
        ? 'Anda memilih tunggu otomatis sampai batas waktu.'
        : 'Pilihan tunggu otomatis dibatalkan.',
      'info',
    )
  }

  function payInstallment(orderId: string) {
    if (!setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, installmentRemaining: 0 } : order,
      ),
    )) return
    push('Pelunasan cicilan dicatat.', 'success')
  }

  function updateReportDraft(orderId: string, patch: Partial<ReportDraft>) {
    const order = orders.find((candidate) => candidate.id === orderId)
    const base = order ? emptyDraft(order) : emptyFallbackDraft()
    setDrafts((current) => ({
      ...current,
      [orderId]: { ...base, ...current[orderId], ...patch },
    }))
  }

  function submitReport(orderId: string, draft: ReportDraft) {
    const nextCounter = ticketCounter + 1
    if (!setTicketCounter(nextCounter)) return

    const ticket = `TKT-${new Date().getFullYear()}-${String(nextCounter).padStart(6, '0')}`
    const saved = setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              reportTicket: ticket,
              report: { ...draft, createdAt: new Date().toISOString() },
            }
          : order,
      ),
    )
    if (!saved) return

    setDrafts((current) => {
      const next = { ...current }
      delete next[orderId]
      return next
    })
    push(`Laporan terkirim · ${ticket}`, 'success')
    navigate(`/orders/${orderId}`)
  }

  return (
    <>
      <AppShell
        notifications={bellNotifications}
        onNotificationSelect={(orderId) => navigate(`/orders/${orderId}`)}
        onNotificationRetry={retry}
      >
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={addToCart}
                adDismissed={!showAds || !adVisible}
                onDismissAd={dismissAd}
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
            element={
              <ReportRoute
                orders={orders}
                drafts={drafts}
                onChange={updateReportDraft}
                onSubmit={submitReport}
              />
            }
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
