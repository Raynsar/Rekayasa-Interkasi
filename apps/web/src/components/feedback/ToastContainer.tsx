import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ToastMessage, ToastType } from '../../hooks/useToasts'

const icons: Record<ToastType, LucideIcon> = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

interface Props {
  toasts: ToastMessage[]
  onDismiss: (id: number) => void
}

export default function ToastContainer({ toasts, onDismiss }: Props) {
  return (
    <div className="toast-container" role="region" aria-label="Notifikasi aplikasi">
      {toasts.map((toast) => {
        const Icon = icons[toast.type]
        return (
          <div className={`toast toast-${toast.type}`} key={toast.id} role="status">
            <Icon size={20} aria-hidden="true" />
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Tutup notifikasi"
              className="toast-close"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
