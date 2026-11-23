import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useAdFrequency } from '../../hooks/useAdFrequency'
import { useAutoComplete } from '../../hooks/useAutoComplete'
import { usePersistentState } from '../../hooks/usePersistentState'
import { makeOrder, storageKey } from '../helpers'

function todayKey(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

describe('usePersistentState — AC-029/AC-036/AC-039', () => {
  it('mengembalikan nilai lama dan memanggil onError saat tulis gagal', () => {
    const onError = vi.fn()
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    const { result } = renderHook(() => usePersistentState('orders', { count: 1 }, onError))
    onError.mockClear()

    let saved: boolean | undefined
    act(() => {
      saved = result.current[1]({ count: 2 })
    })

    expect(saved).toBe(false)
    expect(result.current[0]).toEqual({ count: 1 })
    expect(onError).toHaveBeenCalledWith(expect.stringContaining('Gagal menyimpan data'))
  })

  it('menyimpan perubahan dan mengembalikan true saat tulis berhasil', () => {
    const onError = vi.fn()
    const { result } = renderHook(() => usePersistentState<string[]>('cart', [], onError))

    let saved: boolean | undefined
    act(() => {
      saved = result.current[1](['p-1'])
    })

    expect(saved).toBe(true)
    expect(result.current[0]).toEqual(['p-1'])
    expect(JSON.parse(window.localStorage.getItem(storageKey('cart')) ?? '[]')).toEqual(['p-1'])
    expect(onError).not.toHaveBeenCalled()
  })

  it('membaca nilai yang sudah tersimpan saat mount ulang', () => {
    window.localStorage.setItem(storageKey('show-ads'), 'false')
    const { result } = renderHook(() => usePersistentState('show-ads', true))
    expect(result.current[0]).toBe(false)
  })
})

describe('useAutoComplete — AC-007/AC-009', () => {
  it('TIDAK menjalankan auto-selesai tanpa opt-in', () => {
    const now = Date.now()
    const order = makeOrder(
      {
        id: 'o-no-opt',
        status: 'Diterima',
        autoOptIn: false,
        autoCompleteAt: new Date(now - 60 * 60 * 1000).toISOString(),
      },
      now,
    )
    const onDue = vi.fn()
    renderHook(() => useAutoComplete({ orders: [order], onDue }))
    expect(onDue).not.toHaveBeenCalled()
  })

  it('menjalankan auto-selesai hanya dengan opt-in dan batas terlewat', () => {
    const now = Date.now()
    const order = makeOrder(
      {
        id: 'o-opt',
        status: 'Diterima',
        autoOptIn: true,
        autoCompleteAt: new Date(now - 60 * 60 * 1000).toISOString(),
      },
      now,
    )
    const onDue = vi.fn()
    renderHook(() => useAutoComplete({ orders: [order], onDue }))
    expect(onDue).toHaveBeenCalledTimes(1)
    expect(onDue).toHaveBeenCalledWith('o-opt')
  })

  it('tidak menjalankan auto-selesai sebelum batas waktu', () => {
    const now = Date.now()
    const order = makeOrder(
      {
        status: 'Diterima',
        autoOptIn: true,
        autoCompleteAt: new Date(now + 12 * 60 * 60 * 1000).toISOString(),
      },
      now,
    )
    const onDue = vi.fn()
    renderHook(() => useAutoComplete({ orders: [order], onDue }))
    expect(onDue).not.toHaveBeenCalled()
  })
})

describe('useAdFrequency — AC-014/AC-017/AC-034', () => {
  it('mengizinkan iklan pada tayangan pertama dan menghitung impresi', () => {
    const onError = vi.fn()
    const { result } = renderHook(() => useAdFrequency(onError))
    expect(result.current.visible).toBe(true)

    const stored = JSON.parse(window.localStorage.getItem(storageKey('ad-frequency')) ?? '{}')
    expect(stored.impressions).toBe(1)
    expect(onError).not.toHaveBeenCalled()
  })

  it('menyembunyikan iklan setelah 3 tayangan dalam sehari', () => {
    window.localStorage.setItem(
      storageKey('ad-frequency'),
      JSON.stringify({ dayKey: todayKey(), impressions: 3 }),
    )
    const { result } = renderHook(() => useAdFrequency(vi.fn()))
    expect(result.current.visible).toBe(false)
  })

  it('menerapkan cooldown 24 jam setelah iklan ditutup', () => {
    window.localStorage.setItem(
      storageKey('ad-frequency'),
      JSON.stringify({
        dayKey: todayKey(),
        impressions: 1,
        dismissedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      }),
    )
    const { result } = renderHook(() => useAdFrequency(vi.fn()))
    expect(result.current.visible).toBe(false)
  })

  it('menampilkan kembali iklan setelah cooldown 24 jam berakhir', () => {
    window.localStorage.setItem(
      storageKey('ad-frequency'),
      JSON.stringify({
        dayKey: todayKey(),
        impressions: 1,
        dismissedAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
      }),
    )
    const { result } = renderHook(() => useAdFrequency(vi.fn()))
    expect(result.current.visible).toBe(true)
  })

  it('dismiss menyembunyikan iklan dan menyimpan waktu cooldown', () => {
    const { result } = renderHook(() => useAdFrequency(vi.fn()))
    act(() => {
      result.current.dismiss()
    })

    expect(result.current.visible).toBe(false)
    const stored = JSON.parse(window.localStorage.getItem(storageKey('ad-frequency')) ?? '{}')
    expect(typeof stored.dismissedAt).toBe('string')
  })
})
