import type { ReportDraft } from '../types/report'

export const MAX_DESCRIPTION = 1000
export const MAX_EVIDENCE_BYTES = 5 * 1024 * 1024

export interface ReportErrors {
  category?: string
  description?: string
  evidence?: string
}

/**
 * Validasi murni untuk form laporan. Dipakai ReportForm dan test agar pesan
 * error per field identik (AC-022/AC-024).
 */
export function validateReportDraft(draft: ReportDraft): ReportErrors {
  const errors: ReportErrors = {}

  if (!draft.category) errors.category = 'Kategori wajib dipilih.'
  if (!draft.description.trim()) errors.description = 'Deskripsi wajib diisi.'
  else if (draft.description.length > MAX_DESCRIPTION)
    errors.description = `Deskripsi maksimal ${MAX_DESCRIPTION} karakter.`
  if (draft.evidenceSize !== undefined && draft.evidenceSize > MAX_EVIDENCE_BYTES)
    errors.evidence = 'Ukuran bukti maksimal 5MB.'

  return errors
}

export function hasReportErrors(errors: ReportErrors): boolean {
  return Object.keys(errors).length > 0
}
