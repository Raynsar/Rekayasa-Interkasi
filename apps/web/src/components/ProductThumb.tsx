import { BookOpen, Briefcase, Coffee, Mouse } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ProductIcon, ProductTone } from '../types/order'

const icons: Record<ProductIcon, LucideIcon> = {
  book: BookOpen,
  mouse: Mouse,
  bag: Briefcase,
  coffee: Coffee,
}

interface Props {
  icon: ProductIcon
  tone: ProductTone
  size?: 'sm' | 'md' | 'lg'
}

export default function ProductThumb({ icon, tone, size = 'md' }: Props) {
  const Icon = icons[icon]
  return (
    <span className={`product-thumb tone-${tone} thumb-${size}`} aria-hidden="true">
      <Icon size={size === 'lg' ? 44 : size === 'md' ? 28 : 20} />
    </span>
  )
}
