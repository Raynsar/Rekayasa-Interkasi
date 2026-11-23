import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AdBanner from '../../components/ads/AdBanner'
import PriceBreakdown from '../../components/checkout/PriceBreakdown'
import ConfirmModal from '../../components/feedback/ConfirmModal'
import ReportForm from '../../components/forms/ReportForm'
import FilterTabs from '../../components/orders/FilterTabs'
import { MAX_EVIDENCE_BYTES } from '../../services/report'
import adsCss from '../../styles/ads.css?raw'
import tokensCss from '../../styles/tokens.css?raw'
import { makeOrder } from '../helpers'

describe('PriceBreakdown — AC-002/AC-003', () => {
  const breakdown = {
    lines: [
      { label: 'Harga barang', amount: 36000, kind: 'base' as const },
      { label: 'Ongkos kirim', amount: 9000, kind: 'fee' as const },
      { label: 'Diskon', amount: -1000, kind: 'discount' as const },
    ],
    total: 44000,
  }

  it('awalnya tertutup lalu terbuka saat toggle ditekan', () => {
    render(<PriceBreakdown breakdown={breakdown} />)
    const toggle = screen.getByRole('button', { name: /Rincian Biaya/ })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Ongkos kirim')).not.toBeInTheDocument()

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Ongkos kirim')).toBeInTheDocument()
    expect(screen.getByText('Total akhir')).toBeInTheDocument()

    fireEvent.click(toggle)
    expect(screen.queryByText('Ongkos kirim')).not.toBeInTheDocument()
  })
})

describe('ConfirmModal — AC-005/AC-006', () => {
  it('Batal membatalkan dan tidak memanggil onConfirm', () => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()
    render(
      <ConfirmModal open title="Selesaikan pesanan ini?" message="Yakin?" onConfirm={onConfirm} onCancel={onCancel} />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Batal' }))
    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onConfirm).not.toHaveBeenCalled()
  })

  it('Ya memanggil onConfirm', () => {
    const onConfirm = vi.fn()
    render(
      <ConfirmModal open title="Selesaikan pesanan ini?" message="Yakin?" onConfirm={onConfirm} onCancel={vi.fn()} />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Ya, Selesaikan' }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('tidak merender apa pun saat tertutup', () => {
    const { container } = render(
      <ConfirmModal open={false} title="x" message="y" onConfirm={vi.fn()} onCancel={vi.fn()} />,
    )
    expect(container).toBeEmptyDOMElement()
  })
})

describe('ReportForm — AC-022/AC-023/AC-024/AC-029', () => {
  const order = makeOrder({ status: 'Dikirim' })
  const validDraft = { category: 'Paket belum diterima', description: 'Paket belum sampai.' }

  it('menolak field wajib kosong dengan pesan per field', () => {
    const onSubmit = vi.fn()
    render(
      <ReportForm
        order={order}
        draft={{ category: '', description: '' }}
        onChange={vi.fn()}
        onSubmit={onSubmit}
        onCancel={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /Kirim Laporan/ }))
    expect(screen.getByText('Kategori wajib dipilih.')).toBeInTheDocument()
    expect(screen.getByText('Deskripsi wajib diisi.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('menolak deskripsi lebih dari 1000 karakter', () => {
    render(
      <ReportForm
        order={order}
        draft={{ category: 'Lainnya', description: 'a'.repeat(1001) }}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /Kirim Laporan/ }))
    expect(screen.getByText('Deskripsi maksimal 1000 karakter.')).toBeInTheDocument()
  })

  it('menolak bukti lebih dari 5MB', () => {
    render(
      <ReportForm
        order={order}
        draft={{ ...validDraft, evidenceName: 'besar.png', evidenceSize: MAX_EVIDENCE_BYTES + 1 }}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /Kirim Laporan/ }))
    expect(screen.getByText('Ukuran bukti maksimal 5MB.')).toBeInTheDocument()
  })

  it('mengirim draft valid dengan deskripsi ter-trim', () => {
    const onSubmit = vi.fn()
    render(
      <ReportForm
        order={order}
        draft={{ ...validDraft, description: '  Paket belum sampai.  ' }}
        onChange={vi.fn()}
        onSubmit={onSubmit}
        onCancel={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /Kirim Laporan/ }))
    expect(onSubmit).toHaveBeenCalledWith({ ...validDraft, description: 'Paket belum sampai.' })
  })

  it('melampirkan ID pesanan dan status otomatis', () => {
    render(
      <ReportForm
        order={order}
        draft={validDraft}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    )
    expect(screen.getByText(new RegExp(order.invoice.replaceAll('/', '\\/')))).toBeInTheDocument()
    expect(screen.getByText('Dikirim')).toBeInTheDocument()
  })
})

describe('AdBanner — AC-014/AC-034', () => {
  it('tombol tutup memiliki nama aksesibel dan menutup dalam satu klik', () => {
    const onClose = vi.fn()
    render(<AdBanner onClose={onClose} />)

    const button = screen.getByRole('button', { name: 'Tutup iklan' })
    fireEvent.click(button)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('area sentuh tombol tutup ≥ 44×44px melalui design token', () => {
    expect(tokensCss).toMatch(/--touch-target-min:\s*44px/)
    expect(adsCss).toMatch(/\.ad-close\s*{[^}]*width:\s*var\(--touch-target-min\)[^}]*height:\s*var\(--touch-target-min\)/s)
  })
})

describe('FilterTabs — AC-011', () => {
  it('menampilkan 6 tab kanonik tanpa "Diterima"', () => {
    render(<FilterTabs active="Semua" counts={{ Semua: 7, 'Belum Bayar': 1, Dikemas: 1, Dikirim: 3, Selesai: 1, Dibatalkan: 1 }} onChange={vi.fn()} />)

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(6)
    expect(screen.queryByRole('tab', { name: /Diterima/ })).not.toBeInTheDocument()
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('memanggil onChange dengan status yang dipilih', () => {
    const onChange = vi.fn()
    render(<FilterTabs active="Semua" counts={{ Semua: 7, 'Belum Bayar': 1, Dikemas: 1, Dikirim: 3, Selesai: 1, Dibatalkan: 1 }} onChange={onChange} />)

    fireEvent.click(screen.getByRole('tab', { name: /Dikirim/ }))
    expect(onChange).toHaveBeenCalledWith('Dikirim')
  })
})
