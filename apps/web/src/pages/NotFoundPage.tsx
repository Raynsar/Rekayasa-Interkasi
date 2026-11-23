import EmptyState from '../components/orders/EmptyState'
import PageHeader from '../components/layout/PageHeader'

export default function NotFoundPage() {
  return (
    <>
      <PageHeader title="Halaman tidak ditemukan" />
      <EmptyState
        title="Halaman tidak tersedia"
        description="Kembali ke beranda untuk melanjutkan belanja."
        actionLabel="Ke Beranda"
        onAction={() => {
          window.location.href = '/'
        }}
      />
    </>
  )
}
