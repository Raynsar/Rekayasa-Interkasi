import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface Props {
  title: string
  subtitle?: string
  backTo?: string
  backLabel?: string
}

export default function PageHeader({ title, subtitle, backTo, backLabel = 'Kembali' }: Props) {
  return (
    <header className="page-header">
      {backTo && (
        <Link className="back-link" to={backTo}>
          <ArrowLeft size={16} aria-hidden="true" />
          {backLabel}
        </Link>
      )}
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}
