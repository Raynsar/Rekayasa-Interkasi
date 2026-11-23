import type { Order, Product } from '../types/order'

const DAY = 24 * 60 * 60 * 1000

export const testProduct: Product = {
  id: 'p-test',
  name: 'Produk Uji',
  description: 'Produk untuk pengujian',
  price: 36000,
  sizeFee: 0,
  shippingFee: 9000,
  serviceFee: 3000,
  discount: 1000,
  rating: 4.8,
  sold: 10,
  location: 'Surabaya',
  tone: 'orange',
  icon: 'book',
}

/** Pesanan deterministik dengan waktu relatif terhadap `now`. */
export function makeOrder(overrides: Partial<Order> = {}, now: number = Date.now()): Order {
  return {
    id: 'o-test',
    invoice: 'INV/20261123/MPL/999',
    status: 'Dikirim',
    items: [
      {
        productId: 'p-test',
        name: 'Produk Uji',
        quantity: 1,
        unitPrice: 36000,
        tone: 'orange',
        icon: 'book',
      },
    ],
    breakdown: {
      lines: [{ label: 'Harga barang · Produk Uji (1×)', amount: 36000, kind: 'base' }],
      total: 36000,
    },
    createdAt: new Date(now - 5 * DAY).toISOString(),
    estimateStart: new Date(now - 2 * DAY).toISOString(),
    estimateEnd: new Date(now + 2 * DAY).toISOString(),
    autoOptIn: false,
    shipmentEvents: [{ time: new Date(now - 5 * DAY).toISOString(), title: 'Pesanan dibuat' }],
    address: 'Jl. Uji No. 1, Surabaya',
    courier: 'JNE Reguler',
    paymentMethod: 'ShopeePay',
    ...overrides,
  }
}

export function storageKey(name: string): string {
  return `belanjaku:v2:${name}`
}
