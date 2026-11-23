# INTERACTION SPECIFICATION (INTERACTION-SPEC)

> **Varian B — PRD + UX Skill.** Dokumen ini dipisahkan dari `DESIGN-SYSTEM.md`
> pada Phase 2. Isi `DESIGN-SYSTEM.md` tidak ikut terpindah.

Project: Peningkatan Pengalaman Pelacakan Pesanan Shopee
Version: 2.0
Status: Draft
References: PRD.md v2.0, UX-SPEC.md v2.0, DESIGN-SYSTEM.md v2.0

## 0. Status Kanonik & Auto-Selesai (Keputusan Phase 2)

- Status kanonik: **Belum Bayar, Dikemas, Dikirim, Diterima, Selesai, Dibatalkan**.
- **Diterima** adalah badge sementara saat paket tiba dan **bukan tab filter**.
- **Dalam Perjalanan** bukan status terpisah; merupakan bagian dari **Dikirim**.
- Tab filter: **Semua, Belum Bayar, Dikemas, Dikirim, Selesai, Dibatalkan**.
- Auto-selesai hanya terjadi bila pengguna memilih **"Tunggu Otomatis"** pada
  pengingat 24 jam. Tanpa pengingat/pilihan pengguna, tidak ada auto-selesai.

## 1. Interaction Overview

### 1.1 Objective
Mendefinisikan perilaku interaksi pelacakan & penyelesaian pesanan agar
konsisten, terprediksi, dan memberi rasa kendali — terutama pada aksi
"Selesaikan Pesanan" (MOT Worksheet 7).

### 1.2 Interaction Principles
- Immediate Feedback: setiap aksi menghasilkan respons.
- Predictability: perilaku konsisten.
- Error Prevention: cegah kesalahan sebelum terjadi.
- User Control: pengguna dapat membatalkan aksi.
- State Consistency: status & harga tercermin di semua halaman.
- Persistence: perubahan penting tersimpan.

## 2. Global Interaction Behavior

### 2.1 Navigation

| Action | Behavior |
|---|---|
| Klik Pesanan | Buka daftar pesanan |
| Klik Detail | Buka detail pesanan |
| Tombol kembali | Kembali ke halaman sebelumnya |
| Klik iklan tutup | Menutup iklan tanpa membuka aplikasi |

Menu aktif punya indikator; tidak ada halaman kosong; data tersimpan
dipertahankan.

### 2.2 Global Loading
Tampilkan loading/skeleton; jangan tampilkan data belum terkonfirmasi
sebagai terbaru; jika gagal, tampilkan pesan + coba lagi.

### 2.3 Global Error Handling
Contoh pesan:
- "Daftar pesanan tidak dapat dimuat. Silakan coba kembali."
- "Pesanan gagal diselesaikan. Periksa koneksi dan coba lagi."
- "Laporan gagal dikirim. Silakan coba kembali."

## 3. Harga Final & Rincian Biaya Interaction

### 3.1 Harga Konsisten
**Trigger:** Pengguna berpindah halaman (beranda → produk → keranjang → checkout).
**Behavior:**
1. Harga final ditampilkan sama di semua halaman.
2. Biaya ukuran khusus & ongkir tampil sejak halaman produk.
3. Jika ada perbedaan data historis, tampilkan pesan "harga diperbarui".

### 3.2 Rincian Biaya (Expandable)
**Trigger:** Klik baris "Rincian Biaya" pada checkout/detail.
**Behavior:**
1. Baris membuka (expand) menampilkan komponen biaya.
2. Menampilkan harga, ongkir, biaya layanan, diskon.
3. Total akhir tetap terlihat.
4. Menekan ulang menutup rincian.

**Rule:** Total konsisten dengan rincian; tidak boleh ada perbedaan angka
antara checkout & detail.

## 4. Filter Pesanan Interaction

**Option:** Semua, Belum Bayar, Dikemas, Dikirim, Selesai, Dibatalkan.
**Behavior:**
1. Pengguna memilih tab status.
2. Daftar diperbarui sesuai status.
3. Jumlah per status ditampilkan.
4. Filter bisa digabung pencarian.
5. Jika kosong, tampil empty state + "Reset Filter".

**Catatan:** Diterima bukan tab filter; status tersebut tampil sebagai badge
sementara pada kartu/detail pesanan.

## 5. Selesaikan Pesanan Interaction (MOT)

### 5.1 Trigger
Pengguna menekan **"Selesaikan Pesanan"** pada detail pesanan.

### 5.2 Flow
1. Sistem menampilkan modal konfirmasi: "Selesaikan pesanan ini?
   Pastikan paket sudah kamu terima."
2. Tombol: Batal, Ya, Selesaikan.
3. Batal → modal ditutup, status tetap.
4. Ya → status berubah menjadi Selesai.
5. Pesanan pindah ke tab Selesai.
6. Notifikasi berhasil tampil.
7. Tombol dinonaktifkan selama proses.
8. Cicilan SPayLater dapat dibayar lewat tombol UI **"Lunasi Sekarang"**
   setelah status Selesai (tanpa backend pembayaran).

### 5.3 Pengingat Selesai Otomatis
**Trigger:** 24 jam sebelum batas auto-selesai, untuk pesanan yang pengguna
pilih **"Tunggu Otomatis"** (atau pada saat pengingat pengguna memilih opsi
tersebut).

**Behavior:**
1. Sistem menampilkan pengingat: "Pesanan akan selesai otomatis dalam
   24 jam. Selesaikan sekarang atau tunggu otomatis."
2. Tombol: **Selesaikan Sekarang**, **Tunggu Otomatis**.
3. "Selesaikan Sekarang" → konfirmasi → status Selesai; opt-in auto dicabut.
4. "Tunggu Otomatis" → pilihan pengguna dicatat; status tetap sampai batas
   waktu, lalu berubah menjadi Selesai.
5. Jika pengguna tidak memilih "Tunggu Otomatis", **tidak ada auto-selesai**.
6. Pengguna tetap dapat menyelesaikan manual sampai batas waktu.

### 5.4 Special Rules
- Tombol hanya aktif saat status **Diterima** (badge sementara).
  "Dalam Perjalanan" bukan status terpisah; bagian dari **Dikirim**.
- Tidak ada auto-selesai tanpa **pengingat dan pilihan pengguna**
  ("Tunggu Otomatis").
- Jika gagal, status tetap & pesan error tampil.
- Cegah klik berulang (duplicate submission).
- Total ≤ 2 ketukan dari detail pesanan.

## 6. Status Pesanan Interaction

### 6.1 Status & Transition

| Current | New | Behavior |
|---|---|---|
| Belum Bayar | Dikemas | Pembayaran berhasil |
| Dikemas | Dikirim | Update otomatis dari logistik |
| Dikirim | Diterima | Konfirmasi penerimaan (badge sementara) |
| Diterima | Selesai | Aksi manual pengguna / opt-in auto setelah pengingat |
| Selesai | — | Final, tidak bisa mundur |

**Catatan:** Diterima bukan tab filter. "Dalam Perjalanan" bukan status
terpisah; ditampilkan sebagai informasi pada status **Dikirim**.

### 6.2 Behavior
Status tampil konsisten di daftar & detail. Perubahan disimpan persisten.
Jika gagal, kembalikan status sebelumnya + pesan.

## 7. Estimasi & Notifikasi Keterlambatan Interaction

### 7.1 Estimasi Rentang
Estimasi tiba ditampilkan sebagai rentang (mis. "3–5 hari"), bukan satu
tanggal pasti.

### 7.2 Notifikasi Keterlambatan
**Schedule:** dikirim saat pesanan melewati batas akhir rentang estimasi.
**Content:** nama paket, status, keterlambatan, **langkah berikutnya**.
**Rules:** hanya untuk pesanan aktif; tidak duplikat; kegagalan dicatat.
**Implementasi Phase 2+:** perbandingan "waktu sekarang" vs batas akhir
rentang saat aplikasi dibuka; banner di detail dan/atau toast in-app.

## 8. Pelaporan Masalah Interaction

### 8.1 Flow
1. Klik "Laporkan Masalah".
2. Kategori terisi otomatis (mis. "Paket belum diterima" untuk status
   Dikirim).
3. ID pesanan & status dilampirkan otomatis.
4. Isi deskripsi (wajib).
5. Unggah bukti (opsional).
6. Kirim.
7. Validasi → simpan → tampilkan nomor tiket + konfirmasi.

### 8.2 Validation
- Kategori wajib.
- Deskripsi wajib, maks 1000 karakter.
- Bukti maks 5MB.

### 8.3 States

| State | Behavior |
|---|---|
| Default | Form kosong dengan kategori otomatis |
| Invalid | Pesan error per field |
| Submitting | Tombol loading |
| Success | Nomor tiket + konfirmasi |
| Error | Pesan + input dipertahankan |

## 9. Iklan Interaction
- Iklan dapat ditutup dengan tombol X (area sentuh ≥ 44×44px).
- Iklan tidak membuka aplikasi tanpa aksi pengguna.
- Menutup iklan tidak mengubah state pesanan.
- Batas frekuensi iklan diterapkan untuk mencegah gangguan berulang.

## 10. Empty State Interaction

| Page | Condition | Message | Action |
|---|---|---|---|
| Daftar Pesanan | Kosong | Belum ada pesanan | Mulai Belanja |
| Filter | Tidak ada hasil | Tidak ada pesanan pada status ini | Reset Filter |

## 11. Responsive Interaction
- Desktop: sidebar, modal terpusat, kartu lebar.
- Tablet: sidebar collapsible, filter tab.
- Mobile: navigasi bawah, filter scrollable, aksi full-width,
  bottom sheet.

## 12. Data Consistency
Perubahan status/harga harus tercermin di daftar pesanan, detail,
notifikasi, dan riwayat. Sistem menjamin tidak ada status/harga berbeda
antarkomponen.

## 13. Interaction Completion Rules
Interaksi selesai bila: aksi diproses, data diperbarui, tampilan
mencerminkan kondisi terbaru, pengguna dapat umpan balik, tidak ada
duplikasi, error dapat dipahami.

*End of INTERACTION-SPEC v2.0*

> Catatan: Alur "Selesaikan Pesanan" & pengingat selesai otomatis
> diturunkan dari Worksheet 7 (MOT After) & Worksheet 8 (US-03).
