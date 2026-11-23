import { useCallback, useEffect, useRef, useState } from 'react'
import type { SetStateAction } from 'react'
import { readJson, storageKey, writeJson } from '../services/storage'

export type PersistentSetter<T> = (next: SetStateAction<T>) => boolean

/**
 * State yang ditulis ke localStorage **sebelum** UI berubah. Bila tulis gagal,
 * state lama dipertahankan dan `onError` dipanggil — ini yang memberi perilaku
 * "status kembali ke nilai sebelumnya" saat penyimpanan gagal.
 */
export function usePersistentState<T>(
  name: string,
  initial: T | (() => T),
  onError?: (message: string) => void,
  isValid?: (value: unknown) => value is T,
): readonly [T, PersistentSetter<T>] {
  const [state, setState] = useState<T>(() => {
    const fallback = typeof initial === 'function' ? (initial as () => T)() : initial
    return readJson(name, fallback, isValid)
  })
  const currentRef = useRef(state)

  // Simpan nilai awal agar data seed tidak berubah-ubah saat halaman dimuat ulang.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(storageKey(name)) === null) {
        writeJson(name, currentRef.current)
      }
    } catch {
      onError?.(`Gagal menyiapkan penyimpanan (${name}).`)
    }
  }, [name, onError])

  const set = useCallback<PersistentSetter<T>>(
    (next) => {
      const value = typeof next === 'function' ? (next as (current: T) => T)(currentRef.current) : next
      try {
        writeJson(name, value)
        currentRef.current = value
        setState(value)
        return true
      } catch {
        onError?.(`Gagal menyimpan data (${name}). Perubahan dibatalkan.`)
        return false
      }
    },
    [name, onError, setState],
  )

  return [state, set] as const
}
