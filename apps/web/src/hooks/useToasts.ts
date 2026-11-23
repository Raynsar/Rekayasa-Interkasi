import { useCallback, useState } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: number
  type: ToastType
  message: string
}

export function useToasts() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const push = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = Date.now() + Math.random()
      setToasts((current) => [...current, { id, type, message }])
      // Error penting tetap tampil sampai ditutup pengguna (INTERACTION-SPEC §6.8).
      if (type !== 'error') window.setTimeout(() => dismiss(id), 4000)
      return id
    },
    [dismiss],
  )

  return { toasts, push, dismiss }
}
