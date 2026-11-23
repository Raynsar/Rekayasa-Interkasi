import { Package } from 'lucide-react'

interface Props {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({ title, description, actionLabel, onAction }: Props) {
  return (
    <div className="empty-state">
      <Package size={40} aria-hidden="true" />
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn-outline" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
