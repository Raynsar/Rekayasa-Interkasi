# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Pending
- Deployment: [URL Vercel diisi setelah deploy]

> Setelah deploy manual, URL publik dicatat pada commit kecil terpisah di
> baris ini. Belum ada perubahan fungsional yang direncanakan di Unreleased.

## [2.0.0] - 2026-11-23

Rilis **Varian B — PRD + UX Skill**. Seluruh 42 Acceptance Criteria
(34 Must Have, 8 Should Have) berstatus **Pass** dengan bukti tersimpan;
0 Fail, 0 Blocked, 0 Not Tested. Ringkasan Phase 1–5 dirapikan ke dalam
tiga bagian berikut.

### Added
- Dokumen sumber kebenaran v2.0: `README.md` (PRD publik), `PRD.md`,
  `UX-SPEC.md`, `DESIGN-SYSTEM.md`, `INTERACTION-SPEC.md`,
  `ACCEPTANCE-CRITERIA.md`, `AGENTS.md`, dan `DECISIONS.md` (D-01–D-33).
- Proyek `apps/web`: React 19, TypeScript, Vite 7, React Router 7, Lucide,
  Vitest 5, Testing Library, design token CSS, serta struktur folder
  `components/{layout,navigation,orders,checkout,ads,forms,feedback}`,
  `pages`, `services`, `hooks`, `utils`, `types`, `styles`, dan `tests`.
- Sembilan halaman: Beranda, Produk, Keranjang, Checkout, Daftar Pesanan,
  Detail Pesanan, Laporkan Masalah, Akun, dan 404 — lengkap dengan
  navigasi desktop/mobile dan panel notifikasi.
- `computePriceBreakdown` sebagai sumber harga tunggal; rincian biaya
  expandable tanpa reload dan sinkron di beranda → produk → keranjang →
  checkout → detail pesanan.
- Persistensi `localStorage` melalui `services/storage.ts` dan
  `usePersistentState` (orders, cart, preferensi iklan/notifikasi, draft
  laporan, counter tiket, frekuensi iklan, pengiriman notifikasi, override
  harga). Penulisan dilakukan sebelum perubahan state; kegagalan
  mempertahankan state lama dan memunculkan toast error.
- `useAutoComplete` dengan auto-selesai **hanya** saat pengguna memilih
  "Tunggu Otomatis" pada pengingat 24 jam dan batas waktu terlewat.
- `services/notifications.ts` + `useNotifications`: notifikasi diturunkan
  dari pesanan dengan ID unik `${orderId}:${kind}`, anti-duplikat,
  pencatatan kegagalan, dan tombol "Coba lagi" di panel notifikasi.
- `useAdFrequency`: maksimal 3 tayangan/hari dan cooldown 24 jam setelah
  ditutup; tombol tutup 1 ketukan dengan area sentuh 44×44px.
- Pelaporan masalah in-app: draft autosave per pesanan, lampiran otomatis
  ID/status, validasi per field, dan nomor tiket monoton
  `TKT-YYYY-NNNNNN` (bukti hanya menyimpan nama & ukuran file).
- Tombol UI "Lunasi Sekarang" untuk cicilan SPayLater setelah pesanan
  Selesai — tanpa backend pembayaran.
- `services/priceOverrides.ts`: perubahan harga bertahan setelah reload;
  checkout menampilkan banner "harga diperbarui" dengan nilai terbaru.
- Pure functions `services/report.ts` (`validateReportDraft`,
  `hasReportErrors`, batas 1000 karakter & 5MB) dan `services/ticket.ts`
  (`generateTicketNumber`) untuk memisahkan aturan dari UI.
- Test otomatis Vitest + Testing Library: 7 file / 52 kasus, mencakup
  pure functions, hooks, komponen, dan integrasi (selesaikan pesanan,
  auto-selesai opt-in, anti-duplikat notifikasi, klik ganda konfirmasi).
- Bukti validasi: `docs/validation/phase5/vitest.log`,
  `runtime-ac.json` (32/32), `manual-scenarios.json` (8/8), screenshot
  Phase 3/4/5, dan audit DOM/gaya di `docs/screenshots/`.
- `apps/web/vercel.json` berisi SPA rewrite ke `/index.html` dan bagian
  Deployment pada `README.md` berisi 5 langkah deploy manual ke Vercel.

### Changed
- `README.md` ditetapkan sebagai PRD publik; `PRD.md` tetap dipertahankan
  sebagai rujukan sumber.
- `INTERACTION-SPEC.md` dipisahkan dari `DESIGN-SYSTEM.md`; keduanya
  diverifikasi tidak saling memuat konten.
- Status kanonik diselaraskan ke **Belum Bayar, Dikemas, Dikirim,
  Diterima, Selesai, Dibatalkan**. "Diterima" adalah badge sementara,
  bukan tab; "Dalam Perjalanan" bagian dari "Dikirim" (AC tidak diubah).
- Aturan auto-selesai di `PRD.md`, `AGENTS.md`, `ACCEPTANCE-CRITERIA.md`,
  dan `INTERACTION-SPEC.md` diselaraskan: tanpa pengingat + pilihan
  "Tunggu Otomatis", pesanan tidak pernah diselesaikan otomatis.
- Seluruh warna, tipografi, spacing, dan radius memakai token di
  `tokens.css` (53 token terpakai, 0 token tak terdefinisi); responsif di
  mobile <640px, tablet 640–1023px, desktop ≥1024px, wide ≥1440px.
- Guard `completingRef` dipertahankan setelah penyelesaian berhasil agar
  klik ganda konfirmasi hanya memproses satu perubahan status, dan dilepas
  saat penulisan gagal agar pengguna dapat mencoba lagi.

### Fixed
- Konflik antardokumen pada Phase 1 (auto-selesai, enum status, nama file,
  dan scope SPayLater) dicatat serta diputuskan di `DECISIONS.md`.
- Blok JSON design token yang tidak ditutup di `DESIGN-SYSTEM.md`.
- Stray `shell`/`markdown` di `UX-SPEC.md` dibersihkan tanpa mengubah 25
  heading utama/subheading.
- Klik ganda pada tombol konfirmasi "Selesaikan Pesanan" menghasilkan dua
  toast sukses; kini satu perubahan status dan satu feedback (AC-009),
  dengan test regresi di `integration.test.tsx`.

> Verifikasi rilis: `npm run build` sukses, `npm audit` 0 vulnerability,
> dan 42/42 AC lulus. Deployment Vercel dilakukan manual oleh pemilik
> repo; URL dicatat di `[Unreleased]` setelah tersedia.
