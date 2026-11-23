import { useCallback, useEffect, useRef, useState } from 'react'
import { isAdFrequencyState } from '../services/validators'
import type { AdFrequencyState } from '../services/validators'
import { usePersistentState } from './usePersistentState'

const MAX_IMPRESSIONS_PER_DAY = 3
const COOLDOWN_MS = 24 * 60 * 60 * 1000

function dayKey(now: Date = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

/** Batas frekuensi iklan: maksimal 3 tayangan/hari dan cooldown 24 jam setelah ditutup. */
export function useAdFrequency(onError: (message: string) => void) {
  const [persisted, setPersisted] = usePersistentState<AdFrequencyState>(
    'ad-frequency',
    { dayKey: dayKey(), impressions: 0 },
    onError,
    isAdFrequencyState,
  )
  const [manuallyHidden, setManuallyHidden] = useState(false)
  const countedRef = useRef(false)

  const today = dayKey()
  const state: AdFrequencyState =
    persisted.dayKey === today ? persisted : { dayKey: today, impressions: 0 }

  const inCooldown =
    state.dismissedAt !== undefined &&
    Date.now() - new Date(state.dismissedAt).getTime() < COOLDOWN_MS
  const allowed = state.impressions < MAX_IMPRESSIONS_PER_DAY && !inCooldown

  useEffect(() => {
    if (!allowed || countedRef.current) return
    countedRef.current = true
    setPersisted({ ...state, impressions: state.impressions + 1 })
  }, [allowed, state, setPersisted])

  const dismiss = useCallback(() => {
    setPersisted({ ...state, dismissedAt: new Date().toISOString() })
    setManuallyHidden(true)
  }, [state, setPersisted])

  return { visible: allowed && !manuallyHidden, dismiss }
}
