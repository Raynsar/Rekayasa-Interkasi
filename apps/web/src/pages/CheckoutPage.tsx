import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, MapPin } from 'lucide-react'
import PriceBreakdown from '../components/checkout/PriceBreakdown'
import EmptyState from '../components/orders/EmptyState'
import PageHeader from '../components/layout/PageHeader'
import type { CartLine } from '../types/cart'
import { findProduct } from '../services/seedData'
import { formatRupiah } from '../utils/format'
import { combineBreakdowns, computePriceBreakdown } from '../utils/price'

interface Props {
  cart: CartLine[]
  onPlaceOrder: (paymentMethod: string) => void
}

const PAYMENT_METHODS = ['ShopeePay', 'SPayLater · 3 cicilan', 'Transfer Bank']

export default function CheckoutPage({ cart, onPlaceOrder }: Props) {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0])

  const lines = cart.flatMap((line) => {
    const product = findProduct(line.productId)
    return product ? [{ ...line, product }] : []
  })
  const breakdown = combineBreakdowns(
    lines.map((line) => computePriceBreakdown({ product: line.product, quantity: line.quantity })),
  )
  const priceChanged = lines.some((line) => line.product.price !== line.unitPriceAtAdd)

  return (
    <>
      <PageHeader title="Checkout" subtitle="Total akhir ditampilkan sebelum Anda membayar." backTo="/cart" />

      {lines.length === 0 ? (
        <EmptyState
          title="Belum ada item untuk dibayar"
          description="Tambahkan produk terlebih dahulu sebelum checkout."
          actionLabel="Mulai Belanja"
          onAction={() => navigate('/')}
        />
      ) : (
        <div className="checkout-layout">
          <div className="checkout-main">
            {priceChanged && (
              <div className="banner banner-warning" role="status">
                <AlertCircle size={20} aria-hidden="true" />
                <div className="banner-copy">
                  <strong>harga diperbarui</strong>
                  <p>
                    Sebagian harga berubah sejak dimasukkan ke keranjang. Total
                    di bawah memakai nilai terbaru.
                  </p>
                </div>
              </div>
            )}

            <section className="panel">
              <h2>Alamat pengiriman</h2>
              <p className="address-line">
                <MapPin size={18} aria-hidden="true" />
                Jl. Teknik No. 12, Surabaya, Jawa Timur 60115
              </p>
            </section>

            <section className="panel">
              <h2>Metode pembayaran</h2>
              <div className="payment-options">
                {PAYMENT_METHODS.map((method) => (
                  <label className={paymentMethod === method ? 'payment-option active' : 'payment-option'} key={method}>
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    {method}
                  </label>
                ))}
              </div>
            </section>

            <section className="panel">
              <h2>Rincian biaya</h2>
              <PriceBreakdown breakdown={breakdown} defaultOpen />
            </section>
          </div>

          <aside className="checkout-summary">
            <span className="caption">Total pembayaran</span>
            <strong className="checkout-total">{formatRupiah(breakdown.total)}</strong>
            <button
              type="button"
              className="btn btn-primary btn-full"
              onClick={() => onPlaceOrder(paymentMethod)}
            >
              Bayar Sekarang
            </button>
            <p className="field-hint">Pesanan akan dibuat dengan status Dikemas.</p>
          </aside>
        </div>
      )}
    </>
  )
}
