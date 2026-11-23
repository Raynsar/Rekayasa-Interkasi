/**
 * Nomor tiket deterministik dari counter monoton yang dipersistenkan.
 * Dipisahkan dari App agar dapat diuji sebagai fungsi murni (AC-022/AC-023).
 */
export function generateTicketNumber(counter: number, now: Date = new Date()): string {
  return `TKT-${now.getFullYear()}-${String(counter).padStart(6, '0')}`
}
