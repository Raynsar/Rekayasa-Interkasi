import type { PriceBreakdown, PriceInput, PriceLine } from '../types/order'

export function sumLines(lines: PriceLine[]): number {
  return lines.reduce((total, line) => total + line.amount, 0)
}

/**
 * Sumber tunggal perhitungan harga. Dipakai beranda, produk, keranjang,
 * checkout, dan detail pesanan agar angkanya identik (AC-001 s/d AC-003).
 */
export function computePriceBreakdown(input: PriceInput): PriceBreakdown {
  const {
    product,
    quantity,
    shippingFee = product.shippingFee,
    serviceFee = product.serviceFee,
    discount = product.discount,
  } = input

  const lines: PriceLine[] = [
    {
      label: `Harga barang · ${product.name} (${quantity}×)`,
      amount: product.price * quantity,
      kind: 'base',
    },
  ]

  if (product.sizeFee > 0) {
    lines.push({
      label: `Biaya ukuran khusus · ${product.name}`,
      amount: product.sizeFee * quantity,
      kind: 'fee',
    })
  }

  lines.push({ label: 'Ongkos kirim', amount: shippingFee, kind: 'fee' })
  lines.push({ label: 'Biaya layanan', amount: serviceFee, kind: 'fee' })

  if (discount > 0) {
    lines.push({ label: 'Diskon', amount: -discount, kind: 'discount' })
  }

  return { lines, total: sumLines(lines) }
}

/** Gabungkan beberapa breakdown keranjang tanpa mengubah total. */
export function combineBreakdowns(breakdowns: PriceBreakdown[]): PriceBreakdown {
  const lines: PriceLine[] = []

  for (const breakdown of breakdowns) {
    for (const line of breakdown.lines) {
      const existing = lines.find(
        (candidate) => candidate.label === line.label && candidate.kind === line.kind,
      )
      if (existing) existing.amount += line.amount
      else lines.push({ ...line })
    }
  }

  return { lines, total: sumLines(lines) }
}
