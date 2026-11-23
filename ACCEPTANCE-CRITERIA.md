# ACCEPTANCE CRITERIA

Project: Peningkatan Pengalaman Pelacakan Pesanan Shopee
Version: 2.0
Status: Draft
References: PRD.md v2.0, UX-SPEC.md v2.0, DESIGN-SYSTEM.md v2.0,
INTERACTION-SPEC.md v2.0

## 1. Purpose
Memastikan aplikasi memenuhi kebutuhan PRD, mengikuti UX-SPEC,
DESIGN-SYSTEM, dan INTERACTION-SPEC, serta dapat diuji.

## 2. Convention
**Priority:** Must Have · Should Have · Could Have.
**Verification:** Manual Test · Automated Test · Visual Inspection ·
Integration Test.
**User Story Link:** US-01 s/d US-07 (PRD v2.0).

### 2.1 Status Kanonik & Auto-Selesai (Keputusan Phase 2)
- Status kanonik: **Belum Bayar, Dikemas, Dikirim, Diterima, Selesai, Dibatalkan**.
- **Diterima** adalah badge sementara saat paket tiba dan **bukan tab filter**.
- **Dalam Perjalanan** bukan status terpisah; merupakan bagian dari **Dikirim**.
- Tab filter: **Semua, Belum Bayar, Dikemas, Dikirim, Selesai, Dibatalkan**.
- Auto-selesai hanya terjadi bila pengguna memilih **"Tunggu Otomatis"**
  pada pengingat 24 jam (AC-007). Tanpa pengingat/pilihan pengguna,
  tidak ada auto-selesai.
- AC-001 s/d AC-042 tidak diubah; catatan ini hanya menyelaraskan istilah.

## 3. Harga & Biaya Acceptance Criteria

### AC-001 — Harga Konsisten Beranda = Checkout — Must Have · US-01
Given pengguna membuka halaman produk,
When melanjutkan ke keranjang dan checkout,
Then harga final di semua halaman sama.

### AC-002 — Rincian Biaya Transparan — Must Have · US-02
Given pengguna di checkout,
When membuka rincian biaya,
Then sistem menampilkan harga, ongkir, biaya layanan, diskon, dan total
akhir yang konsisten.

### AC-003 — Total Konsisten — Must Have · US-02
Given rincian biaya dibuka,
When total dihitung,
Then total sama dengan jumlah komponen.

## 4. Selesaikan Pesanan Acceptance Criteria

### AC-004 — Tombol Selesaikan Pesanan Tersedia — Must Have · US-03
Given paket berstatus Diterima,
When pengguna membuka detail pesanan,
Then tombol "Selesaikan Pesanan" terlihat dan dapat ditekan.

### AC-005 — Selesaikan Pesanan Berhasil — Must Have · US-03
Given pengguna menekan "Selesaikan Pesanan" dan mengonfirmasi,
Then status menjadi Selesai, pesanan pindah ke tab Selesai,
dan konfirmasi tampil.

### AC-006 — Batal Selesaikan — Must Have · US-03
Given modal konfirmasi terbuka,
When pengguna memilih Batal,
Then status tidak berubah.

### AC-007 — Tidak Ada Auto-Selesai Tanpa Pengingat — Must Have · US-03
Given pesanan Diterima,
When 24 jam sebelum selesai otomatis,
Then pengingat muncul dan pengguna dapat memilih selesaikan sekarang
atau tunggu otomatis.

### AC-008 — Selesaikan ≤ 2 Ketukan — Must Have · US-03
Given pengguna di detail pesanan,
When menyelesaikan pesanan,
Then selesai dalam ≤ 2 ketukan.

### AC-009 — Duplicate Submission Prevention — Must Have · US-03
Given pengguna menekan tombol selesaikan berulang,
Then hanya satu perubahan status yang diproses.

### AC-010 — Cicilan SPayLater Dapat Dibayar Setelah Selesai — Must Have · US-03
Given pesanan berstatus Selesai,
When pengguna membuka menu pembayaran,
Then opsi pelunasan cicilan tersedia.

## 5. Filter Pesanan Acceptance Criteria

### AC-011 — Filter Status — Must Have · US-04
Given halaman daftar pesanan,
When pengguna memilih tab status,
Then daftar hanya menampilkan pesanan dengan status tersebut.

### AC-012 — Filter + Pencarian — Should Have · US-04
Given filter aktif,
When pengguna mencari,
Then hasil tetap mengikuti filter.

### AC-013 — Status Konsisten — Must Have · US-04
Given status berubah,
When dicek di daftar & detail,
Then keduanya menunjukkan status sama.

## 6. Iklan Acceptance Criteria

### AC-014 — Iklan Tutup 1 Ketukan — Must Have · US-05
Given iklan tampil dengan tombol tutup,
When pengguna menekannya sekali,
Then iklan hilang tanpa membuka aplikasi lain.

### AC-015 — Iklan Tidak Membuka Aplikasi Otomatis — Must Have · US-05
Given iklan tampil,
When pengguna tidak melakukan aksi apa pun,
Then aplikasi lain tidak terbuka otomatis.

### AC-016 — Iklan Tidak Menghalangi Aksi Utama — Must Have · US-05
Given iklan tampil,
Then tombol aksi utama (Selesaikan Pesanan/Lacak) tetap terlihat
dan dapat ditekan.

### AC-017 — Batas Frekuensi Iklan — Should Have · US-05
Given pengguna telah menutup beberapa iklan,
Then sistem menerapkan batas frekuensi agar tidak mengganggu.

## 7. Pengiriman & Notifikasi Acceptance Criteria

### AC-018 — Estimasi Berbentuk Rentang — Must Have · US-06
Given pengguna melihat detail pesanan,
Then estimasi tiba ditampilkan sebagai rentang (misal "3–5 hari").

### AC-019 — Notifikasi Keterlambatan — Must Have · US-06
Given pesanan melewati batas akhir rentang estimasi,
When waktu tercapai,
Then notifikasi terkirim dengan langkah berikutnya.

### AC-020 — Tidak Duplikat Notifikasi — Must Have · US-06
Given satu kondisi keterlambatan,
Then tidak ada notifikasi ganda.

### AC-021 — Kegagalan Notifikasi — Should Have · US-06
Given layanan notifikasi gagal,
Then kegagalan dicatat dan data pesanan tidak berubah.

## 8. Pelaporan Masalah Acceptance Criteria

### AC-022 — Kirim Laporan In-App — Must Have · US-07
Given pengguna di detail pesanan,
When mengirim laporan valid,
Then laporan tersimpan, nomor tiket diberikan, dan konfirmasi tampil.

### AC-023 — Lampiran Otomatis ID Pesanan & Status — Must Have · US-07
Given pengguna membuka form laporan,
Then ID pesanan dan status terisi otomatis tanpa input ulang.

### AC-024 — Validasi Laporan — Must Have · US-07
Given form laporan,
When field wajib kosong,
Then ditolak dengan pesan per field.

## 9. UX Acceptance Criteria

### AC-025 — Navigasi Konsisten — Must Have
Given di halaman mana pun,
When memakai navigasi utama,
Then halaman sesuai dan menu aktif ditandai.

### AC-026 — Feedback — Must Have
Given aksi penting berhasil/gagal,
Then umpan balik jelas.

### AC-027 — Empty State — Should Have
Given tidak ada data,
Then pesan empty state + aksi relevan tampil.

### AC-028 — Responsive — Must Have
Given desktop/tablet/mobile,
Then layout menyesuaikan tanpa overflow.

### AC-029 — Error Recovery — Must Have
Given data tidak valid,
When error tampil,
Then pengguna dapat memperbaiki tanpa kehilangan data lain.

## 10. Design System Acceptance Criteria

### AC-030 — Konsistensi Warna — Must Have
Semua komponen memakai warna sesuai DESIGN-SYSTEM.

### AC-031 — Tipografi — Should Have
Hierarki teks konsisten.

### AC-032 — Komponen — Must Have
Button, input, card, badge, modal gaya konsisten.

### AC-033 — Status Indicator — Must Have
Status punya indikator konsisten + label teks.

### AC-034 — Area Sentuh Tombol Tutup Iklan — Must Have
Area sentuh tombol tutup iklan ≥ 44×44px.

## 11. Non-Functional Acceptance Criteria

### AC-035 — Performance — Should Have
Halaman utama tampil ≤ 3 detik pada kondisi wajar.

### AC-036 — Data Persistence — Must Have
Given pesanan diubah,
When muat ulang/masuk kembali,
Then data tetap.

### AC-037 — Data Isolation — Must Have
Pengguna hanya mengakses pesanannya sendiri.

### AC-038 — Accessibility — Should Have
Fungsi utama keyboard-accessible, label jelas, status tidak hanya warna.

## 12. Edge Case Acceptance Criteria

### AC-039 — Jaringan Gagal Saat Selesaikan — Must Have · US-03
Given menyelesaikan pesanan,
When koneksi terputus,
Then pesan gagal, status tidak berubah, cegah duplikasi.

### AC-040 — Harga Berubah Saat Checkout — Must Have · US-01
Given harga produk berubah setelah pengguna menambah ke keranjang,
When pengguna membuka checkout,
Then sistem menampilkan pesan "harga diperbarui" dengan nilai baru.

### AC-041 — Paket Sudah Diterima, Status Belum Berubah — Must Have · US-03
Given paket diterima,
When pengguna membuka detail,
Then tombol "Selesaikan Pesanan" tersedia.

### AC-042 — Filter Kosong — Should Have · US-04
Given filter tanpa hasil,
Then empty state + Reset Filter tampil.

## 13. Release Acceptance
Rilis v2.0 bila: semua Must Have lulus; tidak ada bug kritis; harga &
status persisten; aksi selesaikan/filter/lapor/iklan berfungsi; notifikasi
keterlambatan & anti-duplikat lulus; responsif & konsisten dengan design
system; tanpa masalah keamanan kritis; regresi fitur utama lulus.
Should/Could yang belum terpenuhi dicatat sebagai pekerjaan lanjutan.

## 14. Test Execution Report

| Field | Description |
|---|---|
| Criteria ID | ID AC |
| Test Status | Pass/Fail/Blocked/Not Tested |
| Test Evidence | Screenshot/log |
| Bug Reference | ID bug |
| Notes | Catatan penguji |

*End of ACCEPTANCE-CRITERIA v2.0*

> Catatan: AC-001 s/d AC-024 diturunkan langsung dari 7 User Story
> Worksheet 8; sisanya asumsi pelengkap untuk keterujian.