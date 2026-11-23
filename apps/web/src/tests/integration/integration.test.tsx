import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../../App'
import { makeOrder, storageKey } from '../helpers'

const DAY = 24 * 60 * 60 * 1000

function Jump({ to, label }: { to: string; label: string }) {
  const navigate = useNavigate()
  return (
    <button type="button" onClick={() => navigate(to)}>
      {label}
    </button>
  )
}

function seedOrders(orders: ReturnType<typeof makeOrder>[]) {
  window.localStorage.setItem(storageKey('orders'), JSON.stringify(orders))
}

function readOrders() {
  return JSON.parse(window.localStorage.getItem(storageKey('orders')) ?? '[]')
}

describe('Integrasi — AC-005/AC-013', () => {
  it('selesaikan pesanan mengubah status di detail dan daftar', async () => {
    const now = Date.now()
    seedOrders([
      makeOrder(
        {
          id: 'o-1',
          invoice: 'INV/20261123/MPL/001',
          status: 'Diterima',
          paymentMethod: 'SPayLater · 3 cicilan',
          installmentRemaining: 3,
        },
        now,
      ),
    ])

    render(
      <MemoryRouter initialEntries={['/orders/o-1']}>
        <Jump to="/orders" label="Ke Daftar" />
        <App />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Selesaikan Pesanan' }))
    fireEvent.click(screen.getByRole('button', { name: 'Ya, Selesaikan' }))

    await waitFor(() => expect(readOrders()[0].status).toBe('Selesai'))
    expect(screen.getByRole('button', { name: /Lunasi Sekarang/ })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Ke Daftar' }))
    expect(screen.getByText('INV/20261123/MPL/001')).toBeInTheDocument()
    const badge = document.querySelector('.status-badge.status-selesai')
    expect(badge).not.toBeNull()
    expect(badge).toHaveTextContent('Selesai')
  })
})

describe('Integrasi — AC-009', () => {
  it('klik ganda konfirmasi hanya memproses satu penyelesaian', async () => {
    seedOrders([makeOrder({ id: 'o-dup', status: 'Diterima' })])

    render(
      <MemoryRouter initialEntries={['/orders/o-dup']}>
        <App />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Selesaikan Pesanan' }))
    const confirm = screen.getByRole('button', { name: 'Ya, Selesaikan' })
    fireEvent.click(confirm)
    fireEvent.click(confirm)

    await waitFor(() => expect(readOrders()[0].status).toBe('Selesai'))
    expect(
      screen.getAllByText('Pesanan selesai. Cicilan SPayLater dapat dibayar.'),
    ).toHaveLength(1)
  })
})

describe('Integrasi — AC-007/AC-009', () => {
  it('auto-selesai berjalan dengan opt-in dan batas terlewat', async () => {
    const now = Date.now()
    seedOrders([
      makeOrder(
        {
          id: 'o-auto',
          status: 'Diterima',
          autoOptIn: true,
          autoCompleteAt: new Date(now - 60 * 60 * 1000).toISOString(),
        },
        now,
      ),
    ])

    render(
      <MemoryRouter initialEntries={['/orders/o-auto']}>
        <App />
      </MemoryRouter>,
    )

    await waitFor(() => expect(readOrders()[0].status).toBe('Selesai'))
    expect(readOrders()[0].autoCompleted).toBe(true)
    expect(screen.getByText('Selesai otomatis sesuai pilihan Anda')).toBeInTheDocument()
  })

  it('tidak auto-selesai tanpa opt-in meski batas terlewat', async () => {
    const now = Date.now()
    seedOrders([
      makeOrder(
        {
          id: 'o-manual',
          status: 'Diterima',
          autoOptIn: false,
          autoCompleteAt: new Date(now - 60 * 60 * 1000).toISOString(),
        },
        now,
      ),
    ])

    render(
      <MemoryRouter initialEntries={['/orders/o-manual']}>
        <App />
      </MemoryRouter>,
    )

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Selesaikan Pesanan' })).toBeInTheDocument(),
    )
    expect(readOrders()[0].status).toBe('Diterima')
    expect(screen.queryByText('Selesai otomatis sesuai pilihan Anda')).not.toBeInTheDocument()
  })
})

describe('Integrasi — AC-020/AC-021', () => {
  it('notifikasi tidak duplikat setelah mount ulang', async () => {
    const now = Date.now()
    seedOrders([
      makeOrder(
        { id: 'o-late', status: 'Dikirim', estimateEnd: new Date(now - DAY).toISOString() },
        now,
      ),
    ])
    const deliveriesKey = storageKey('notification-deliveries')

    const first = render(
      <MemoryRouter initialEntries={['/orders']}>
        <App />
      </MemoryRouter>,
    )
    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem(deliveriesKey) ?? '[]')).toHaveLength(1)
    })
    first.unmount()

    render(
      <MemoryRouter initialEntries={['/orders']}>
        <App />
      </MemoryRouter>,
    )
    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem(deliveriesKey) ?? '[]')).toHaveLength(1)
    })
    expect(screen.getByRole('button', { name: 'Notifikasi (1)' })).toBeInTheDocument()
  })
})

describe('Integrasi — AC-022/AC-023/AC-024', () => {
  it('laporan valid menghasilkan tiket dan menghapus draft', async () => {
    seedOrders([makeOrder({ id: 'o-1', status: 'Dikirim' })])

    render(
      <MemoryRouter initialEntries={['/orders/o-1/report']}>
        <App />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Deskripsi'), {
      target: { value: 'Paket belum sampai setelah 3 hari.' },
    })
    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem(storageKey('report-drafts')) ?? '{}')['o-1']).toBeDefined()
    })

    fireEvent.click(screen.getByRole('button', { name: /Kirim Laporan/ }))

    await waitFor(() => expect(readOrders()[0].reportTicket).toMatch(/^TKT-\d{4}-\d{6}$/))
    const drafts = JSON.parse(window.localStorage.getItem(storageKey('report-drafts')) ?? '{}')
    expect(drafts['o-1']).toBeUndefined()
    expect(screen.getByText(/Laporan terkirim/)).toBeInTheDocument()
  })
})
