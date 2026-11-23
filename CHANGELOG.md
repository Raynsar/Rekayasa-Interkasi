# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Phase 1 — Analyze (2026-11-23)
- Konfirmasi **Varian B — PRD + UX Skill**.
- Analisis 7 fitur dan 42 Acceptance Criteria (34 Must Have, 8 Should Have),
  dependensi, komponen reusable, dan risiko.
- Catat konflik dokumen: auto-selesai, enum status, nama file, dan scope SPayLater.
- Keputusan produk: auto-selesai hanya setelah pengingat 24 jam **dan** pilihan
  "Tunggu Otomatis"; status kanonik diselaraskan; tab filter final ditetapkan;
  SPayLater cukup UI tanpa backend.

### Phase 2 — Setup (2026-11-23)
- Inisialisasi git lokal: branch `main`, remote `origin`, **tanpa push**.
- Buat `README.md` dari `PRD.md` + instruksi deploy Vercel 3 langkah.
- Pisahkan `INTERACTION-SPEC.md` dari `DESIGN-SYSTEM.md`; verifikasi tidak ada
  konten design system yang ikut terpindah dan sebaliknya.
- Selaraskan status kanonik & aturan auto-selesai di `PRD.md`, `AGENTS.md`,
  `ACCEPTANCE-CRITERIA.md`, dan `INTERACTION-SPEC.md` (AC tidak diubah).
- Buat `DECISIONS.md` berisi keputusan D-01 dan seterusnya.
- Scaffold `apps/web`: React 19, TypeScript, Vite 7, React Router 7, Lucide,
  Vitest 5, Testing Library, CSS tokens, struktur folder, dan `vercel.json`.
- Verifikasi: `npm run build` sukses, `npx vitest run --passWithNoTests` sukses,
  `npm audit` 0 vulnerability.

### Phase 3 — UI (2026-11-23)
- Bersihkan stray `shell`/`markdown` di `UX-SPEC.md`; verifikasi 25 heading
  utama/subheading tetap utuh dan tidak ada blok kode terpotong.
- Halaman baru: `HomePage`, `ProductPage`, `CartPage`, `CheckoutPage`,
  `OrdersPage`, `OrderDetailPage`, `ReportPage`, `AccountPage`, `NotFoundPage`.
- Layout & navigasi: `AppShell`, `Sidebar` (desktop), `BottomNav` (mobile),
  `PageHeader`, `NotificationBell` dengan panel notifikasi.
- Komponen pesanan: `OrderCard`, `FilterTabs` (6 tab, Diterima bukan tab),
  `SearchInput`, `EmptyState`, `StatusBadge`, `DeliveryEstimate`,
  `ShippingTimeline`, `CompleteOrderPanel`.
- Komponen commerce & feedback: `PriceBreakdown` (expandable tanpa reload),
  `ProductThumb`, `ConfirmModal`, `DelayBanner`, `ReminderBanner`,
  `ToastContainer`, `AdBanner` (tombol tutup 44×44px).
- Form & utilitas: `ReportForm` (validasi kategori/deskripsi/bukti 5MB),
  `computePriceBreakdown` sebagai sumber harga tunggal, formatter rupiah/tanggal,
  dan helpers estimasi keterlambatan/pengingat.
- Ganti `App.tsx` scaffold dengan routing penuh; seluruh warna/spacing/tipografi
  memakai token di `tokens.css` (verifikasi 53 token terpakai, 0 yang belum terdefinisi).
- Responsif di 4 breakpoint: mobile <640px, tablet ≥640px, desktop ≥1024px,
  wide ≥1440px.
- Verifikasi: `npm run build` sukses; smoke test dev server HTTP 200 dengan
  mount point & entry point benar.
- Visual validation via headless Chrome: 9/9 route merender konten yang
  diharapkan (tidak ada root kosong / crash); 28/28 kombinasi route × viewport
  (390/768/1440/1920px) bebas overflow horizontal.
- Screenshot dihasilkan untuk mobile/tablet/desktop, tetapi belum dibaca
  secara visual oleh agent (model tidak mendukung input gambar) — dicatat sebagai
  keterbatasan, bukan Pass.
- Permukaan UI tersedia untuk AC-001–AC-003 (harga), AC-004–AC-010 (kontrol
  selesai & SPayLater), AC-011–AC-013/AC-027/AC-042 (filter, pencarian, empty
  state), AC-014–AC-017/AC-034 (iklan), AC-018–AC-021 (estimasi & notifikasi),
  AC-022–AC-024 (laporan), dan AC-025–AC-026/AC-028/AC-030–AC-033/AC-038
  (navigasi, feedback, responsif, desain, aksesibilitas). **Belum ada yang
  ditandai Pass** — status Pass/Fail diberikan di Phase 5 setelah pengujian
  fungsional.

### Phase 4 — Fungsi (2026-11-23)
- Persistensi `localStorage` melalui `services/storage.ts` + hook
  `usePersistentState`: `orders`, `cart`, `show-ads`, `notify-delay`,
  `report-drafts`, `ticket-counter`, `ad-frequency`, `notification-deliveries`.
  Penulisan terjadi **sebelum** perubahan state; bila gagal, state lama
  dipertahankan dan toast error tampil (AC-029/AC-036/AC-039).
- `useAutoComplete`: auto-selesai **hanya** untuk pesanan yang pengguna pilih
  "Tunggu Otomatis" dan batas 24 jam sudah terlewat; tanpa opt-in tidak ada
  auto-selesai. Guard `completingRef` mencegah duplikasi (AC-007/AC-009).
- Sinkronisasi status: satu sumber state pesanan dipakai daftar, detail,
  notifikasi, dan keranjang; perubahan langsung terlihat di semua halaman.
- `services/notifications.ts` + `useNotifications`: notifikasi diturunkan
  dari pesanan dengan ID unik `${orderId}:${kind}` sehingga tidak duplikat;
  pengiriman & kegagalan dicatat, panel notifikasi menyediakan tombol
  "Coba lagi", dan data pesanan tidak berubah saat gagal (AC-019–AC-021).
- `useAdFrequency`: maksimal 3 tayangan/hari + cooldown 24 jam setelah
  ditutup; tombol tutup tetap 1 ketukan dan ≥44×44px (AC-014–AC-017/AC-034).
- Pelaporan masalah final: draft per pesanan tersimpan otomatis, validasi
  per field, nomor tiket monoton `TKT-YYYY-NNNNNN`, serta lampiran otomatis
  berupa ID/status pesanan. Bukti hanya menyimpan nama & ukuran file, bukan
  isinya (AC-022–AC-024/AC-037).
- `services/priceOverrides.ts`: perubahan harga bertahan setelah reload;
  checkout menampilkan "harga diperbarui" bila harga berubah sejak item
  masuk keranjang (AC-001/AC-040).
- Verifikasi runtime headless Chrome: **12/12 skenario lolos** — kunci
  localStorage, anti-duplikat notifikasi, selesaikan manual + persistensi,
  tanpa/sertaan opt-in auto-selesai, cooldown iklan, draft & tiket laporan,
  harga diperbarui, dan sinkronisasi status.
- AC yang mulai teruji: AC-001, AC-004–AC-010, AC-014–AC-024, AC-029,
  AC-036–AC-037, AC-039–AC-040. **Belum ada yang ditandai Pass** — keputusan
  Pass/Fail diambil di Phase 5 dengan bukti pengujian.

## [2.0.0] - 2026-11-23

### Added
- Dokumen sumber kebenaran v2.0: PRD, UX-SPEC, DESIGN-SYSTEM,
  INTERACTION-SPEC, ACCEPTANCE-CRITERIA, dan AGENTS.md.
- Proyek `apps/web` dengan design token, konfigurasi build, dan SPA rewrite
  untuk Vercel.

### Changed
- `README.md` ditetapkan sebagai PRD publik; `PRD.md` tetap dipertahankan
  sebagai rujukan sumber.
- Aturan auto-selesai dan enum status diselaraskan ke keputusan Phase 1.

### Fixed
- Blok JSON design token yang tidak ditutup di `DESIGN-SYSTEM.md`.

> Catatan: Phase 6 akan menambahkan entri deploy berisi URL Vercel dan,
> jika sudah dirilis, memindahkan isi `[Unreleased]` ke versi rilis.
