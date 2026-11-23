import { describe, expect, it } from 'vitest'
import {
  hasReportErrors,
  MAX_DESCRIPTION,
  MAX_EVIDENCE_BYTES,
  validateReportDraft,
} from '../../services/report'
import { generateTicketNumber } from '../../services/ticket'

const valid = { category: 'Paket belum diterima', description: 'Paket belum sampai.' }

describe('reportValidator — AC-022/AC-024', () => {
  it('menerima draft yang valid', () => {
    expect(validateReportDraft(valid)).toEqual({})
    expect(hasReportErrors(validateReportDraft(valid))).toBe(false)
  })

  it('menolak kategori kosong dengan pesan per field', () => {
    const errors = validateReportDraft({ category: '', description: 'Isi ada.' })
    expect(errors.category).toBe('Kategori wajib dipilih.')
    expect(errors.description).toBeUndefined()
  })

  it('menolak deskripsi kosong atau hanya spasi', () => {
    expect(validateReportDraft({ category: 'Lainnya', description: '   ' }).description).toBe(
      'Deskripsi wajib diisi.',
    )
  })

  it('menolak deskripsi lebih dari 1000 karakter', () => {
    const errors = validateReportDraft({
      category: 'Lainnya',
      description: 'a'.repeat(MAX_DESCRIPTION + 1),
    })
    expect(errors.description).toBe('Deskripsi maksimal 1000 karakter.')
  })

  it('menerima tepat 1000 karakter', () => {
    const errors = validateReportDraft({
      category: 'Lainnya',
      description: 'a'.repeat(MAX_DESCRIPTION),
    })
    expect(errors.description).toBeUndefined()
  })

  it('menolak bukti lebih dari 5MB', () => {
    const errors = validateReportDraft({
      ...valid,
      evidenceSize: MAX_EVIDENCE_BYTES + 1,
    })
    expect(errors.evidence).toBe('Ukuran bukti maksimal 5MB.')
  })

  it('menerima bukti tepat 5MB', () => {
    const errors = validateReportDraft({ ...valid, evidenceSize: MAX_EVIDENCE_BYTES })
    expect(errors.evidence).toBeUndefined()
  })

  it('mengembalikan banyak error sekaligus', () => {
    const errors = validateReportDraft({ category: '', description: '' })
    expect(hasReportErrors(errors)).toBe(true)
    expect(Object.keys(errors).sort()).toEqual(['category', 'description'])
  })
})

describe('ticketGenerator — AC-022/AC-023', () => {
  it('membuat nomor tiket dengan years dan padding 6 digit', () => {
    const now = new Date('2026-11-23T10:00:00.000Z')
    expect(generateTicketNumber(1, now)).toBe('TKT-2026-000001')
    expect(generateTicketNumber(12345, now)).toBe('TKT-2026-012345')
  })

  it('counter monoton menghasilkan tiket unik', () => {
    const now = new Date('2026-11-23T10:00:00.000Z')
    const first = generateTicketNumber(1, now)
    const second = generateTicketNumber(2, now)
    expect(first).not.toBe(second)
  })
})
