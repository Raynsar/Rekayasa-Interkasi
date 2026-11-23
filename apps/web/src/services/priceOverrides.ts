import { readJson, writeJson } from './storage'
import { isNumberMap } from './validators'

/**
 * Harga dapat berubah setelah item masuk keranjang (AC-040). Override ini
 * disimpan persisten agar perubahan harga bertahan saat halaman dimuat ulang.
 */
export function readPriceOverrides(): Record<string, number> {
  return readJson('price-overrides', {}, isNumberMap)
}

export function writePriceOverride(productId: string, price: number): boolean {
  try {
    writeJson('price-overrides', { ...readPriceOverrides(), [productId]: price })
    return true
  } catch {
    return false
  }
}
