/**
 * Penyimpanan persisten berskop aplikasi. Semua kunci diawali prefix agar
 * tidak bertabrakan dengan data situs lain pada origin yang sama (AC-037).
 */
const PREFIX = 'belanjaku:v2:'

export function storageKey(name: string): string {
  return `${PREFIX}${name}`
}

export function readJson<T>(
  name: string,
  fallback: T,
  isValid?: (value: unknown) => value is T,
): T {
  try {
    const raw = window.localStorage.getItem(storageKey(name))
    if (raw === null) return fallback
    const parsed: unknown = JSON.parse(raw)
    if (isValid && !isValid(parsed)) return fallback
    return parsed as T
  } catch {
    return fallback
  }
}

/** Melempar error agar pemanggil bisa membatalkan perubahan (AC-029/AC-039). */
export function writeJson<T>(name: string, value: T): void {
  window.localStorage.setItem(storageKey(name), JSON.stringify(value))
}

export function removeKey(name: string): void {
  try {
    window.localStorage.removeItem(storageKey(name))
  } catch {
    // Penghapusan gagal hanya berarti draft lama tersisa; tidak merusak data lain.
  }
}
