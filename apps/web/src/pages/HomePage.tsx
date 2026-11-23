import { Link } from 'react-router-dom'
import { Plus, Star } from 'lucide-react'
import AdBanner from '../components/ads/AdBanner'
import PageHeader from '../components/layout/PageHeader'
import ProductThumb from '../components/ProductThumb'
import { PRODUCTS } from '../services/seedData'
import { computePriceBreakdown } from '../utils/price'
import { formatRupiah } from '../utils/format'

interface Props {
  onAddToCart: (productId: string) => void
  adDismissed: boolean
  onDismissAd: () => void
}

export default function HomePage({ onAddToCart, adDismissed, onDismissAd }: Props) {
  return (
    <>
      <PageHeader
        title="Beranda"
        subtitle="Harga final sudah termasuk ongkir dan biaya layanan sejak awal."
      />

      {!adDismissed && <AdBanner onClose={onDismissAd} />}

      <section className="product-grid" aria-label="Daftar produk">
        {PRODUCTS.map((product) => {
          const finalPrice = computePriceBreakdown({ product, quantity: 1 }).total
          return (
            <article className="product-card" key={product.id}>
              <Link to={`/products/${product.id}`} className="product-card-main">
                <ProductThumb icon={product.icon} tone={product.tone} size="lg" />
                <h3>{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-meta">
                  <span>
                    <Star size={14} aria-hidden="true" /> {product.rating}
                  </span>
                  <span>{product.sold} terjual</span>
                  <span>{product.location}</span>
                </div>
                <strong className="product-final-price">{formatRupiah(finalPrice)}</strong>
                <span className="caption">Harga final · 1 item</span>
              </Link>
              <button
                type="button"
                className="btn btn-primary btn-full btn-sm"
                onClick={() => onAddToCart(product.id)}
              >
                <Plus size={16} aria-hidden="true" />
                Tambah ke Keranjang
              </button>
            </article>
          )
        })}
      </section>
    </>
  )
}
