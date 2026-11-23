import { Link, useParams } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import PriceBreakdown from '../components/checkout/PriceBreakdown'
import EmptyState from '../components/orders/EmptyState'
import PageHeader from '../components/layout/PageHeader'
import ProductThumb from '../components/ProductThumb'
import { findProduct } from '../services/seedData'
import { computePriceBreakdown } from '../utils/price'
import { formatRupiah } from '../utils/format'

interface Props {
  onAddToCart: (productId: string) => void
}

export default function ProductPage({ onAddToCart }: Props) {
  const { id } = useParams()
  const product = id ? findProduct(id) : undefined

  if (!product) {
    return (
      <>
        <PageHeader title="Produk" backTo="/" />
        <EmptyState
          title="Produk tidak ditemukan"
          description="Produk yang Anda cari tidak tersedia."
          actionLabel="Kembali ke Beranda"
          onAction={() => window.history.back()}
        />
      </>
    )
  }

  const breakdown = computePriceBreakdown({ product, quantity: 1 })

  return (
    <>
      <PageHeader title={product.name} backTo="/" backLabel="Beranda" />
      <div className="product-detail-layout">
        <section className="product-detail-hero">
          <ProductThumb icon={product.icon} tone={product.tone} size="lg" />
          <div>
            <p className="product-desc">{product.description}</p>
            <div className="product-meta">
              <span>
                <Star size={14} aria-hidden="true" /> {product.rating}
              </span>
              <span>{product.sold} terjual</span>
              <span>{product.location}</span>
            </div>
            <strong className="product-final-price">{formatRupiah(breakdown.total)}</strong>
            <span className="caption">Harga final · sama sampai checkout</span>
          </div>
        </section>

        <aside className="product-detail-side">
          <PriceBreakdown breakdown={breakdown} defaultOpen />
          <button
            type="button"
            className="btn btn-primary btn-full"
            onClick={() => onAddToCart(product.id)}
          >
            <ShoppingCart size={18} aria-hidden="true" />
            Tambah ke Keranjang
          </button>
          <Link
            className="btn btn-outline btn-full"
            to="/checkout"
            onClick={() => onAddToCart(product.id)}
          >
            Beli Langsung
          </Link>
        </aside>
      </div>
    </>
  )
}
