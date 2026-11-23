export interface ReportDraft {
  category: string
  description: string
  evidenceName?: string
  evidenceSize?: number
}

export interface ReportTicket {
  ticket: string
  orderId: string
  category: string
  description: string
  evidenceName?: string
  createdAt: string
}
