import { useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import PriceBreakdown from '../components/checkout/PriceBreakdown'
import EmptyState from '../components/orders/EmptyState'
import PageHeader from '../components/layout/PageHeader'
import ProductThumb from '../components/ProductThumb'
import type { CartLine } from '../types/cart'
import { findProduct } from '../services/seedData'
import { combineBreakdowns, computePriceBreakdown } from '../utils/price'
import { formatRupiah } from '../utils/format'

interface Props {
  cart: CartLine[]
  onChangeQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export default function CartPage({ cart, onChangeQuantity, onRemove }: Props) {
  const navigate = useNavigate()
  const lines = cart.flatMap((line) => {
    const product = findProduct(line.productId)
    return product ? [{ ...line, product }] : []
  })
  const breakdown = combineBreakdowns(
    lines.map((line) => computePriceBreakdown({ product: line.product, quantity: line.quantity })),
  )

  return (
    <>
      <PageHeader title="Keranjang" subtitle="Periksa harga final sebelum checkout." backTo="/" />

      {lines.length === 0 ? (
        <EmptyState
          title="Keranjang kosong"
          description="Tambahkan produk agar harga finalnya bisa Anda lihat di sini."
          actionLabel="Mulai Belanja"
          onAction={() => navigate('/')}
        />
      ) : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Item keranjang">
            {lines.map((line) => (
              <article className="cart-item" key={line.productId}>
                <ProductThumb icon={line.product.icon} tone={line.product.tone} />
                <div className="cart-item-info">
                  <strong>{line.product.name}</strong>
                  <span className="caption">{formatRupiah(line.product.price)} / item</span>
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(line.productId, line.quantity - 1)}
                      aria-label={`Kurangi jumlah ${line.product.name}`}
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <span aria-live="polite">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(line.productId, line.quantity + 1)}
                      aria-label={`Tambah jumlah ${line.product.name}`}
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <strong>{formatRupiah(line.product.price * line.quantity)}</strong>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => onRemove(line.productId)}
                    aria-label={`Hapus ${line.product.name} dari keranjang`}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <PriceBreakdown breakdown={breakdown} defaultOpen />
            <button
              type="button"
              className="btn btn-primary btn-full"
              onClick={() => navigate('/checkout')}
            >
              Lanjut ke Checkout
            </button>
          </aside>
        </div>
      )}
    </>
  )
}
