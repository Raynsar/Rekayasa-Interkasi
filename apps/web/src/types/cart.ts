export interface CartLine {
  productId: string
  quantity: number
  /** Harga saat item dimasukkan; dipakai untuk mendeteksi "harga diperbarui". */
  unitPriceAtAdd: number
}
