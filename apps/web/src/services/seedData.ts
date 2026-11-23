import type { Order, OrderItem, Product } from '../types/order'
import { computePriceBreakdown } from '../utils/price'

const DAY_MS = 24 * 60 * 60 * 1000
const HOUR_MS = 60 * 60 * 1000
const baseTime = Date.now()

const at = (days: number, hours = 0): string =>
  new Date(baseTime + days * DAY_MS + hours * HOUR_MS).toISOString()

/** Data seed demo — ditandai eksplisit, bukan data produksi. */
export const PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Buku Teks Rekayasa Interaksi',
    description: 'Edisi terbaru, cocok untuk mata kuliah semester 7.',
    price: 36000,
    sizeFee: 0,
    shippingFee: 9000,
    serviceFee: 3000,
    discount: 1000,
    rating: 4.8,
    sold: 231,
    location: 'Surabaya',
    tone: 'orange',
    icon: 'book',
  },
  {
    id: 'p-2',
    name: 'Mouse Wireless Silent',
    description: 'Klik senyap, baterai tahan 30 hari, koneksi USB-C.',
    price: 129000,
    sizeFee: 0,
    shippingFee: 12000,
    serviceFee: 4000,
    discount: 10000,
    rating: 4.9,
    sold: 1240,
    location: 'Jakarta Pusat',
    tone: 'blue',
    icon: 'mouse',
  },
  {
    id: 'p-3',
    name: 'Tas Laptop 14 inch',
    description: 'Tahan air, kompartemen bantalan, ukuran khusus.',
    price: 185000,
    sizeFee: 15000,
    shippingFee: 15000,
    serviceFee: 5000,
    discount: 20000,
    rating: 4.7,
    sold: 86,
    location: 'Bandung',
    tone: 'green',
    icon: 'bag',
  },
  {
    id: 'p-4',
    name: 'Kopi Instan 10 Sachet',
    description: 'Rasa original, praktis untuk belajar semalaman.',
    price: 27000,
    sizeFee: 0,
    shippingFee: 8000,
    serviceFee: 1500,
    discount: 2500,
    rating: 4.6,
    sold: 512,
    location: 'Malang',
    tone: 'violet',
    icon: 'coffee',
  },
]

export function findProduct(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id)
}

function makeItem(productId: string, quantity = 1): OrderItem {
  const product = findProduct(productId)
  if (!product) throw new Error(`Produk ${productId} tidak ditemukan`)
  return {
    productId,
    name: product.name,
    quantity,
    unitPrice: product.price,
    tone: product.tone,
    icon: product.icon,
  }
}

function makeBreakdown(productId: string, quantity = 1) {
  const product = findProduct(productId)
  if (!product) throw new Error(`Produk ${productId} tidak ditemukan`)
  return computePriceBreakdown({ product, quantity })
}

const ADDRESS = 'Jl. Teknik No. 12, Surabaya, Jawa Timur 60115'

const SEED_ORDERS: Order[] = [
  {
    id: 'o-1',
    invoice: 'INV/20261122/MPL/001',
    status: 'Diterima',
    items: [makeItem('p-1')],
    breakdown: makeBreakdown('p-1'),
    createdAt: at(-5),
    estimateStart: at(-2),
    estimateEnd: at(1),
    autoCompleteAt: at(0, 18),
    autoOptIn: false,
    shipmentEvents: [
      { time: at(-5), title: 'Pesanan dibuat', active: false },
      { time: at(-4), title: 'Dikemas penjual', active: false },
      { time: at(-2), title: 'Dikirim', description: 'Kurir JNE · JP0123456', active: false },
      { time: at(-0.2), title: 'Paket diterima', description: 'Badge sementara — konfirmasi penyelesaian', active: true },
    ],
    address: ADDRESS,
    courier: 'JNE Reguler',
    paymentMethod: 'SPayLater · 3 cicilan',
    installmentRemaining: 3,
  },
  {
    id: 'o-2',
    invoice: 'INV/20261121/MPL/002',
    status: 'Dikirim',
    items: [makeItem('p-2')],
    breakdown: makeBreakdown('p-2'),
    createdAt: at(-7),
    estimateStart: at(-4),
    estimateEnd: at(-1),
    autoOptIn: false,
    shipmentEvents: [
      { time: at(-7), title: 'Pesanan dibuat', active: false },
      { time: at(-6), title: 'Dikemas penjual', active: false },
      { time: at(-5), title: 'Dikirim', description: 'Kurir SiCepat · SP9988776', active: true },
    ],
    address: ADDRESS,
    courier: 'SiCepat BEST',
    paymentMethod: 'ShopeePay',
  },
  {
    id: 'o-3',
    invoice: 'INV/20261122/MPL/003',
    status: 'Dikirim',
    items: [makeItem('p-3')],
    breakdown: makeBreakdown('p-3'),
    createdAt: at(-1),
    estimateStart: at(1),
    estimateEnd: at(3),
    autoOptIn: false,
    shipmentEvents: [
      { time: at(-1), title: 'Pesanan dibuat', active: false },
      { time: at(-0.5), title: 'Dikemas penjual', active: true },
      { time: at(1), title: 'Dikirim', description: 'Estimasi pengambilan kurir' },
    ],
    address: ADDRESS,
    courier: 'J&T Express',
    paymentMethod: 'Transfer Bank',
  },
  {
    id: 'o-4',
    invoice: 'INV/20261123/MPL/004',
    status: 'Dikemas',
    items: [makeItem('p-4', 2)],
    breakdown: makeBreakdown('p-4', 2),
    createdAt: at(-0.5),
    estimateStart: at(2),
    estimateEnd: at(4),
    autoOptIn: false,
    shipmentEvents: [
      { time: at(-0.5), title: 'Pesanan dibuat', active: true },
      { time: at(0.5), title: 'Dikemas penjual' },
    ],
    address: ADDRESS,
    courier: 'JNE Reguler',
    paymentMethod: 'ShopeePay',
  },
  {
    id: 'o-5',
    invoice: 'INV/20261105/MPL/005',
    status: 'Selesai',
    items: [makeItem('p-2')],
    breakdown: makeBreakdown('p-2'),
    createdAt: at(-20),
    estimateStart: at(-16),
    estimateEnd: at(-13),
    autoOptIn: false,
    shipmentEvents: [
      { time: at(-20), title: 'Pesanan dibuat', active: false },
      { time: at(-17), title: 'Dikirim', active: false },
      { time: at(-14), title: 'Paket diterima', active: false },
      { time: at(-13), title: 'Pesanan selesai', active: true },
    ],
    address: ADDRESS,
    courier: 'JNE Reguler',
    paymentMethod: 'SPayLater · 3 cicilan',
    installmentRemaining: 3,
  },
  {
    id: 'o-6',
    invoice: 'INV/20261123/MPL/006',
    status: 'Belum Bayar',
    items: [makeItem('p-4')],
    breakdown: makeBreakdown('p-4'),
    createdAt: at(-0.1),
    estimateStart: at(2),
    estimateEnd: at(4),
    autoOptIn: false,
    shipmentEvents: [{ time: at(-0.1), title: 'Menunggu pembayaran', active: true }],
    address: ADDRESS,
    courier: 'JNE Reguler',
    paymentMethod: 'ShopeePay',
  },
  {
    id: 'o-7',
    invoice: 'INV/20261110/MPL/007',
    status: 'Dibatalkan',
    items: [makeItem('p-1')],
    breakdown: makeBreakdown('p-1'),
    createdAt: at(-10),
    estimateStart: at(-7),
    estimateEnd: at(-5),
    autoOptIn: false,
    shipmentEvents: [{ time: at(-10), title: 'Pesanan dibatalkan', active: true }],
    address: ADDRESS,
    courier: 'JNE Reguler',
    paymentMethod: 'ShopeePay',
  },
]

/** Salinan baru agar perubahan UI tidak memutasi seed. */
export function getSeedOrders(): Order[] {
  return structuredClone(SEED_ORDERS)
}
