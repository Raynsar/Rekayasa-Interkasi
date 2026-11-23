import { describe, expect, it } from 'vitest'
import { combineBreakdowns, computePriceBreakdown, sumLines } from '../../utils/price'
import { testProduct } from '../helpers'

describe('computePriceBreakdown — AC-001/AC-002/AC-003', () => {
  it('menjumlahkan harga, ongkir, layanan, dan diskon dengan benar', () => {
    const result = computePriceBreakdown({ product: testProduct, quantity: 2 })

    expect(result.lines.map((line) => line.kind)).toEqual(['base', 'fee', 'fee', 'discount'])
    expect(result.lines[0].amount).toBe(72000)
    expect(result.total).toBe(72000 + 9000 + 3000 - 1000)
    expect(result.total).toBe(sumLines(result.lines))
  })

  it('memasukkan biaya ukuran khusus dan mengabaikan diskon nol', () => {
    const result = computePriceBreakdown({
      product: { ...testProduct, sizeFee: 5000, discount: 0 },
      quantity: 1,
    })

    expect(result.lines.some((line) => line.label.includes('ukuran khusus'))).toBe(true)
    expect(result.lines.some((line) => line.kind === 'discount')).toBe(false)
    expect(result.total).toBe(36000 + 5000 + 9000 + 3000)
  })

  it('total identik untuk input yang sama (sumber harga tunggal)', () => {
    const a = computePriceBreakdown({ product: testProduct, quantity: 3 })
    const b = computePriceBreakdown({ product: testProduct, quantity: 3 })
    expect(a.total).toBe(b.total)
  })

  it('combineBreakdowns menggabungkan baris sama tanpa mengubah total', () => {
    const first = computePriceBreakdown({ product: testProduct, quantity: 1 })
    const second = computePriceBreakdown({ product: testProduct, quantity: 1 })
    const combined = combineBreakdowns([first, second])

    expect(combined.total).toBe(first.total + second.total)
    expect(combined.lines.filter((line) => line.kind === 'base')).toHaveLength(1)
    expect(combined.lines.find((line) => line.kind === 'base')?.amount).toBe(72000)
    expect(combined.total).toBe(sumLines(combined.lines))
  })
})
