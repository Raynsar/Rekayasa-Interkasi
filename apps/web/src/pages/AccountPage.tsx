import { Bell, Megaphone } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'

interface Props {
  showAds: boolean
  notifyDelay: boolean
  onToggleAds: (value: boolean) => void
  onToggleNotifyDelay: (value: boolean) => void
}

export default function AccountPage({
  showAds,
  notifyDelay,
  onToggleAds,
  onToggleNotifyDelay,
}: Props) {
  return (
    <>
      <PageHeader title="Akun" subtitle="Pengaturan iklan dan notifikasi." />
      <section className="panel settings-panel">
        <label className="setting-row">
          <Megaphone size={22} aria-hidden="true" />
          <span>
            <strong>Tampilkan iklan</strong>
            <small>Iklan dapat ditutup kapan saja dalam satu ketukan.</small>
          </span>
          <input
            type="checkbox"
            checked={showAds}
            onChange={(event) => onToggleAds(event.target.checked)}
          />
        </label>
        <label className="setting-row">
          <Bell size={22} aria-hidden="true" />
          <span>
            <strong>Notifikasi keterlambatan</strong>
            <small>Banner dan toast saat estimasi pengiriman terlampaui.</small>
          </span>
          <input
            type="checkbox"
            checked={notifyDelay}
            onChange={(event) => onToggleNotifyDelay(event.target.checked)}
          />
        </label>
      </section>
    </>
  )
}
