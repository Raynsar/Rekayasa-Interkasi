export type NotificationKind = 'delay' | 'reminder'

export interface NotificationItemModel {
  id: string
  orderId: string
  type: NotificationKind
  title: string
  description: string
  createdAt: string
}

export interface NotificationDelivery {
  id: string
  status: 'delivered' | 'failed'
  reason?: string
  createdAt: string
}
