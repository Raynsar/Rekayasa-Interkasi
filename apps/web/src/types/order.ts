export type OrderStatus =
  | 'Belum Bayar'
  | 'Dikemas'
  | 'Dikirim'
  | 'Diterima'
  | 'Selesai'
  | 'Dibatalkan'

export const ORDER_STATUSES: OrderStatus[] = [
  'Belum Bayar',
  'Dikemas',
  'Dikirim',
  'Diterima',
  'Selesai',
  'Dibatalkan',
]

/** Diterima sengaja tidak masuk tab filter — hanya badge sementara. */
export type FilterStatus =
  | 'Semua'
  | 'Belum Bayar'
  | 'Dikemas'
  | 'Dikirim'
  | 'Selesai'
  | 'Dibatalkan'

export const FILTER_STATUSES: FilterStatus[] = [
  'Semua',
  'Belum Bayar',
  'Dikemas',
  'Dikirim',
  'Selesai',
  'Dibatalkan',
]

export interface PriceLine {
  label: string
  amount: number
  kind: 'base' | 'fee' | 'discount'
}

export interface PriceBreakdown {
  lines: PriceLine[]
  total: number
}

export type ProductTone = 'orange' | 'blue' | 'green' | 'violet'
export type ProductIcon = 'book' | 'mouse' | 'bag' | 'coffee'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  sizeFee: number
  shippingFee: number
  serviceFee: number
  discount: number
  rating: number
  sold: number
  location: string
  tone: ProductTone
  icon: ProductIcon
}

export interface PriceInput {
  product: Product
  quantity: number
  shippingFee?: number
  serviceFee?: number
  discount?: number
}

export interface OrderItem {
  productId: string
  name: string
  quantity: number
  unitPrice: number
  tone: ProductTone
  icon: ProductIcon
}

export interface ShipmentEvent {
  time: string
  title: string
  description?: string
  active?: boolean
}

export interface Order {
  id: string
  invoice: string
  status: OrderStatus
  items: OrderItem[]
  breakdown: PriceBreakdown
  createdAt: string
  estimateStart: string
  estimateEnd: string
  autoCompleteAt?: string
  autoOptIn: boolean
  shipmentEvents: ShipmentEvent[]
  address: string
  courier: string
  paymentMethod: string
  installmentRemaining?: number
  reportTicket?: string
  report?: {
    category: string
    description: string
    evidenceName?: string
    createdAt: string
  }
}
