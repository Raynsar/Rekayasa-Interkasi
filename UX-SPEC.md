# USER EXPERIENCE SPECIFICATION (UX-SPEC)

Fitur: Peningkatan Pengalaman Pelacakan Pesanan Shopee
Versi: 2.0
Referensi: PRD.md v2.0, Worksheet 6–8
Status: Draft

## 1. UX Overview

### 1.1 UX Objective
Membantu pembeli Shopee memantau dan mengelola pesanan dengan pengalaman
yang transparan, terkontrol, dan bebas gangguan — terutama pada tahap
After (pasca-penerimaan paket), di mana MOT terjadi.

Pengguna harus dapat:
- Melihat harga yang sama sejak beranda sampai checkout.
- Melihat rincian biaya sebelum membayar.
- Menyelesaikan pesanan sendiri dalam ≤ 2 ketukan.
- Memfilter pesanan per status.
- Menutup iklan dalam 1 ketukan tanpa terlempar keluar.
- Mendapat notifikasi keterlambatan dengan langkah berikutnya.
- Melaporkan masalah tanpa keluar aplikasi.

### 1.2 UX Design Principles
- **Transparency:** Harga & biaya ditampilkan apa adanya dan konsisten.
- **User Control:** Pengguna memutuskan kapan pesanan selesai.
- **Consistency:** Status & harga konsisten di semua halaman.
- **Low Distraction:** Iklan mudah ditutup dan tidak memaksa keluar.
- **Clarity:** Pesan keterlambatan menyertakan langkah berikutnya.
- **Accessibility:** Status tidak hanya dibedakan lewat warna.

## 2. User Context (dari Worksheet 6 & 7)

### 2.1 Primary Persona
Raka Pratama, 22 tahun, mahasiswa, rutin belanja di Shopee, sering pakai
ShopeePay/SPayLater, sering cek status pesanan.

### 2.2 User Goals

| Goal | Expected Experience |
|---|---|
| Mengetahui harga final | Harga beranda = checkout sejak awal |
| Memahami biaya | Rincian biaya expandable sebelum bayar |
| Mengontrol penyelesaian | Tombol Selesaikan Pesanan selalu ada |
| Menemukan pesanan | Filter per status di daftar pesanan |
| Bebas gangguan iklan | Iklan tutup 1 ketukan, tidak memaksa keluar |
| Pengiriman andal | Estimasi rentang + notifikasi keterlambatan |
| Bantuan in-app | Lapor masalah tanpa DM media sosial |

### 2.3 Main User Scenario (Journey Before → During → After)
Raka menemukan produk dengan harga jelas (Before), checkout dengan rincian
biaya transparan (During), lalu setelah barang diterima ia menekan
"Selesaikan Pesanan" dan melunasi cicilan SPayLater (After).

## 3. Information Architecture (turunan Journey W7)

> IA di bawah ini diturunkan dari User Journey Map Worksheet 7 (Before –
> During – After), bukan dari Worksheet 9 (yang tidak dijadikan acuan).

Halaman utama (Beranda)
├── Katalog / Halaman Produk
│   └── Harga Final + Rincian Biaya (Before)
├── Keranjang & Checkout
│   └── Rincian Biaya Sebelum Bayar (During)
├── Pesanan Saya
│   ├── Daftar Pesanan (Filter per Status)
│   ├── Detail Pesanan
│   │   ├── Pelacakan + Notifikasi Keterlambatan
│   │   ├── Selesaikan Pesanan + Pengingat (After)
│   │   └── Laporkan Masalah (After)
│   └── Pembayaran / Pelunasan (ShopeePay, SPayLater)
├── Akun
│   └── Pengaturan Iklan & Notifikasi
└── Bantuan
├── Pusat Bantuan
└── Chat / Laporan

makefile

## 4. Page Specification

### PAGE-01: Halaman Produk
**Purpose:** Menampilkan harga final yang konsisten dengan checkout.
**Information:** Harga final, biaya ukuran khusus (jika ada), ongkir, diskon.
**Actions:** Tambah ke keranjang, beli langsung.
**Outcome:** Raka tahu harga sebenarnya di halaman awal.

### PAGE-02: Checkout (Rincian Biaya)
**Purpose:** Total biaya transparan sebelum pembayaran.
**Information:** Harga barang, ongkir, biaya layanan, diskon voucher, total
akhir (expandable).
**Actions:** Buka/tutup rincian, pilih pembayaran, bayar.
**Outcome:** Raka memahami komponen biaya tanpa kaget.

### PAGE-03: Daftar Pesanan
**Purpose:** Menampilkan seluruh pesanan dengan filter per status.
**Information:** Kartu pesanan (produk, status, total), tab filter, pencarian.
**Actions:** Filter, cari, buka detail.
**Outcome:** Raka menemukan pesanan dengan cepat.

### PAGE-04: Detail Pesanan
**Purpose:** Menampilkan informasi lengkap + aksi utama.
**Information:** Status, produk, alamat, rincian biaya, estimasi (rentang),
riwayat pengiriman.
**Actions:** Lacak, **Selesaikan Pesanan**, Lapor Masalah.
**Outcome:** Raka mengontrol pesanan dan menyelesaikannya sendiri.

### PAGE-05: Pelaporan Masalah
**Purpose:** Pelaporan masalah in-app.
**Fields:** Kategori masalah, deskripsi, unggah bukti.
**Actions:** Kirim laporan, batal.
**Outcome:** Raka melapor tanpa DM media sosial.

## 5. User Flow

### 5.1 Flow: Menyelesaikan Pesanan (After – MOT)

Daftar Pesanan
|
v
Filter "Dikirim"
|
v
Pilih Pesanan
|
v
Detail Pesanan
|
v
Klik "Selesaikan Pesanan"
|
v
Modal Konfirmasi
|
+-- Batal --> Status tetap
|
+-- Ya --> Status = Selesai
|
v
Notifikasi Berhasil
|
v
Pindah ke Tab Selesai
|
v
Cicilan SPayLater dapat dibayar

### 5.2 Flow: Melihat Rincian Biaya (Before → During)

Beranda → Halaman Produk (harga final) → Keranjang
→ Checkout (buka rincian biaya) → Total Akhir → Bayar

### 5.3 Flow: Melaporkan Masalah (After)

Detail Pesanan → Lapor Masalah → Pilih Kategori → Isi Deskripsi
→ Kirim → Konfirmasi + Nomor Tiket

### 5.4 Flow: Menutup Iklan

Iklan muncul → Klik X (area sentuh memadai) → Iklan hilang
(atau) Iklan muncul tanpa aksi pengguna → tidak membuka aplikasi

## 6. User Interaction Requirements
- Tombol "Selesaikan Pesanan" selalu terlihat, tidak tertutup iklan.
- Rincian biaya dapat dibuka tanpa keluar dari halaman.
- Filter status menampilkan jumlah pesanan per status.
- Aksi penting (selesaikan, lapor) memberi umpan balik.
- Status pesanan memiliki label teks, bukan hanya warna.
- Notifikasi keterlambatan menyertakan langkah berikutnya.
- Iklan ditutup dalam 1 ketukan, tidak memindahkan pengguna ke aplikasi lain.

## 7. Responsive Experience
- **Desktop:** Daftar pesanan kartu lebar, rincian biaya panel samping.
- **Tablet:** Filter tab, kartu pesanan adaptif.
- **Mobile:** Kartu pesanan satu kolom, tombol aksi full-width, rincian
  biaya bottom sheet.

## 8. Empty States
- Daftar Pesanan kosong: "Belum ada pesanan" + "Mulai Belanja".
- Filter kosong: "Tidak ada pesanan pada status ini" + "Reset Filter".
- Detail tanpa riwayat: "Informasi pengiriman belum tersedia".

## 9. UX Error Prevention
- Konfirmasi sebelum menyelesaikan pesanan.
- Validasi field laporan wajib.
- Pesan jelas jika laporan gagal terkirim.
- Harga tidak boleh berubah tanpa pemberitahuan.
- Iklan tidak boleh menutupi tombol aksi utama.

## 10. UX Deliverables
Page Specification, User Flow, Wireframe, Prototype, UI Design,
Responsive Design, Interaction Specification.

## 11. UX Design Constraints
- Seluruh aksi harus memiliki fungsi.
- Status & harga konsisten antar halaman.
- Tidak ada fitur di luar PRD tanpa persetujuan.
- Alur utama dapat diselesaikan tanpa kebingungan.
- IA mengikuti journey (Worksheet 7), bukan sitemap Worksheet 9.

*End of UX-SPEC v2.0*

> Catatan: Sitemap/Content Inventory/Card Sorting dari Worksheet 9 tidak
> dijadikan acuan. IA di atas diturunkan dari Journey Map (Worksheet 7).