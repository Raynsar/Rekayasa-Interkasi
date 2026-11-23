# PRODUCT REQUIREMENTS DOCUMENT (PRD)

> **Varian B — PRD + UX Skill.** README ini adalah PRD proyek. `PRD.md`
> dipertahankan sebagai rujukan sumber hingga rilis.

Fitur: Peningkatan Pengalaman Pelacakan Pesanan Shopee
Versi: 2.0
Status: Draft
Referensi: Worksheet Pertemuan 05–08 (Interview Record U1–U5, Empathy Map,
Persona, User Journey Map + MOT, Insight→Need→Requirement, User Stories)

## 1. Product Overview

### 1.1 Latar Belakang
Raka Pratama, mahasiswa 22 tahun, rutin berbelanja kebutuhan kuliah dan
sehari-hari di Shopee. Setelah checkout, ia memantau posisi paket dan
menyelesaikan pesanan. Dari 10 ulasan Play Store rating 1–3 bintang
(30 Agustus–19 September 2026, dianalisis sebagai U1–U5), keluhan justru
bukan soal teknis (lemot/error) — tidak satu pun menyebut itu. Keluhan
berpusat pada kepercayaan dan kejelasan: harga tidak konsisten (U1),
alur menyelesaikan pesanan berubah setelah pembaruan (U2, U5), iklan
memaksa masuk aplikasi (U3), dan pengiriman yang lambat/tidak jelas (U4).

Benang merahnya: pengguna merasa kehilangan kontrol dan kepastian saat
aplikasi berubah (“Shopee tidak seperti dulu lagi”).

### 1.2 Product Vision
Memberikan kembali rasa kendali dan kepastian kepada pembeli Shopee atas
setiap pesanannya — harga transparan sejak beranda, status pesanan yang
akurat, penyelesaian pesanan yang bisa dikontrol sendiri, dan bantuan
langsung di dalam aplikasi.

### 1.3 Target Pengguna
Pembeli aktif Shopee di Indonesia berusia 18–40 tahun (mahasiswa dan
pekerja) yang berbelanja lewat aplikasi mobile, sering memakai
ShopeePay/SPayLater, dan mengecek status pesanan secara berkala.

## 2. User Problem

Berdasarkan analisis ulasan (U1–U5), keluhan utama:

- Harga di beranda berbeda dengan harga saat checkout (U1); contoh
  36.000 menjadi 47.000, sehingga promo terasa menipu.
- Setelah pembaruan, tombol “Selesaikan Pesanan” hilang dan pesanan
  selesai otomatis setelah 2 hari; daftar pesanan panjang (U2).
- Status pesanan tidak akurat walau paket sudah diterima; cicilan
  SPayLater tertahan (U2, U5).
- Iklan memaksa membuka aplikasi saat pengguna sedang browsing/mengedit,
  sehingga pekerjaan hilang (U3).
- Pengiriman melambat sejak pembaruan 2026; estimasi dan status tidak
  andal (U4).
- Balasan Shopee mengarahkan pengguna ke DM media sosial dan meminta
  username/screenshot, bukan penyelesaian di dalam aplikasi (4 ulasan
  dari JOHAN 79, TruthfulMonkey, Hamba Allah, ulasan 16 Sep).

**Problem Statement**
Pembeli Shopee membutuhkan transparansi harga dan kendali penuh atas
penyelesaian pesanan — harga yang konsisten sejak beranda, status yang
akurat, iklan yang bisa ditutup, estimasi pengiriman yang diandalkan, dan
bantuan yang tidak memaksa keluar aplikasi — agar mereka kembali percaya
dan tenang bertransaksi.

## 3. User Need (dari Worksheet 8: Insight → Need → Requirement)

| Research Insight | User Need | Functional Requirement | UX Requirement |
|---|---|---|---|
| Harga di beranda tidak sama dengan saat checkout sehingga promo terasa menipu (U1, ulasan tutik). | Harga dan biaya yang transparan dan konsisten. | Menampilkan harga final (termasuk biaya ukuran khusus dan ongkir) di beranda & halaman produk, sinkron dengan checkout, menampilkan rincian biaya sebelum bayar. | Harga di beranda sama dengan checkout; rincian biaya terbaca tanpa scroll berlebihan; label promo jelas. |
| Alur menyelesaikan pesanan rumit setelah pembaruan: selesai otomatis 2 hari, tombol hilang, status tidak akurat (U2, U5). | Kontrol atas penyelesaian pesanan dan status yang akurat. | Tombol "Selesaikan Pesanan" selalu tersedia setelah status pengiriman; pengingat sebelum selesai otomatis; daftar pesanan dapat difilter per status. | Pesanan dapat diselesaikan dalam ≤ 2 ketukan; status selalu sesuai kondisi; pesanan yang sudah beres ditandai berbeda. |
| Iklan memaksa masuk aplikasi, tombol tutup kecil/tidak ada, pekerjaan hilang (U3, ulasan Ersa & Karimah). | Iklan yang bisa ditutup dan tidak mengganggu aktivitas. | Tombol tutup (X) dengan area sentuh memadai; iklan tidak membuka aplikasi tanpa aksi pengguna; batas frekuensi iklan. | Iklan bisa ditutup dalam 1 ketukan; menutup iklan tidak membuka aplikasi. |
| Pengiriman melambat sejak pembaruan 2026 dan paket tidak diantar padahal sudah ditugaskan (U4). | Estimasi dan status pengiriman yang bisa diandalkan. | Estimasi tiba berbentuk rentang berbasis data historis kurir; notifikasi saat terlambat; opsi ajukan bantuan dari halaman pesanan. | Pesan keterlambatan jelas dengan langkah berikutnya; estimasi ditampilkan sebagai rentang. |
| Balasan Shopee pada 4 ulasan mengarahkan pengguna DM media sosial; salah satunya meminta username & screenshot (JOHAN 79, TruthfulMonkey, Hamba Allah, ulasan 16 Sep). | Bantuan langsung di dalam aplikasi tanpa mengulang detail. | Tombol "Laporkan Masalah" pada halaman pesanan yang otomatis melampirkan ID pesanan & status, memberi nomor tiket. | Pengguna tidak perlu mengetik ulang info; konfirmasi laporan diterima langsung ditampilkan. |

## 4. User Persona

**Nama:** Raka Pratama (fiktif)
**Umur:** 22 Tahun
**Pekerjaan:** Mahasiswa
**Lokasi:** Surabaya

**Goal**
- Membeli kebutuhan kuliah dengan harga sesuai yang ia lihat.
- Memantau dan menyelesaikan pesanan dengan mudah.

**Behavior**
- Membandingkan harga di beranda dengan saat checkout sebelum membayar (U1).
- Menulis ulasan rating rendah di Play Store ketika kecewa (U1–U5).

**Pain Point**
- Harga di beranda berbeda dengan saat checkout (U1).
- Alur menyelesaikan pesanan rumit dan status tidak akurat (U2, U5).
- Iklan memaksa masuk aplikasi dan sulit ditutup (U3).

**Need**
- Harga dan biaya yang transparan sejak beranda.
- Kontrol atas penyelesaian pesanan, status akurat, dan iklan yang bisa ditutup.

**Evidence:** Analisis ulasan Play Store pada U1–U5 (rating 1–3 bintang;
interview langsung tidak dilakukan, diganti analisis ulasan atas izin dosen).

## 5. Product Goals
- Menghadirkan harga & biaya yang konsisten sejak beranda sampai checkout.
- Mengembalikan kontrol pengguna atas penyelesaian pesanan.
- Memastikan status pesanan akurat dan dapat difilter.
- Mengurangi gangguan iklan (mudah ditutup, tidak memaksa keluar).
- Menyediakan estimasi & notifikasi pengiriman yang andal.
- Menyediakan kanal pelaporan masalah in-app.

**Success Metrics**

| Indikator | Target Awal |
|---|---|
| Kesamaan harga beranda vs checkout | 100% konsisten |
| Pesanan diselesaikan manual oleh pengguna | ≥ 80% pesanan |
| Keluhan status pesanan tidak akurat | Turun dibanding baseline |
| Iklan dapat ditutup dalam 1 ketukan | 100% iklan |
| Penggunaan fitur lapor masalah in-app | Terukur setelah rilis |

Catatan: target merupakan hipotesis awal yang perlu divalidasi.

## 6. Functional Requirements

**FR-01: Transparansi & Konsistensi Harga**
- Menampilkan harga final (termasuk biaya ukuran khusus dan ongkir) di beranda dan halaman produk.
- Menyinkronkan harga di beranda, halaman produk, keranjang, dan checkout.
- Menampilkan rincian biaya (expandable) sebelum bayar.

**FR-02: Kontrol Penyelesaian Pesanan**
- Tombol "Selesaikan Pesanan" selalu tersedia setelah status pengiriman.
- Pengingat 24 jam sebelum batas auto-selesai.
- Sistem tidak menyelesaikan pesanan otomatis tanpa pengingat/pilihan pengguna.
- Auto-selesai terjadi hanya jika pengguna memilih "Tunggu Otomatis" pada
  pengingat 24 jam; tanpa pilihan tersebut pesanan tetap menunggu aksi manual.
- Setelah diselesaikan, pesanan berpindah ke tab Selesai.

**FR-03: Akurasi Status Pesanan**
- Status kanonik: Belum Bayar, Dikemas, Dikirim, Diterima, Selesai, Dibatalkan.
- Diterima adalah badge sementara saat paket tiba dan bukan tab filter.
- "Dalam Perjalanan" bukan status terpisah; merupakan bagian dari Dikirim.
- Status diperbarui ketika pengguna mengonfirmasi penerimaan.
- Daftar pesanan dapat difilter per status: Semua, Belum Bayar, Dikemas,
  Dikirim, Selesai, Dibatalkan.

**FR-04: Kontrol Iklan**
- Tombol tutup (X) dengan area sentuh memadai.
- Iklan tidak membuka aplikasi tanpa aksi pengguna.
- Batas frekuensi iklan.

**FR-05: Estimasi & Notifikasi Pengiriman**
- Estimasi tiba berbentuk rentang berbasis data historis kurir.
- Notifikasi saat pengiriman terlambat.
- Opsi mengajukan bantuan dari halaman pesanan.

**FR-06: Pelaporan Masalah In-App**
- Tombol "Laporkan Masalah" pada halaman pesanan.
- Otomatis melampirkan ID pesanan & status.
- Memberi nomor tiket dan konfirmasi laporan.

**FR-07: Pembayaran ShopeePay / SPayLater (UI saja)**
- Tombol UI "Lunasi Sekarang" pada detail pesanan setelah status Selesai.
- Tidak ada backend pembayaran; aksi hanya memberi konfirmasi in-app.

## 7. Non-Functional Requirements
- **NFR-01 Performance:** Halaman daftar & detail pesanan dimuat cepat; perubahan status tampil tanpa reload penuh.
- **NFR-02 Usability:** Menyelesaikan pesanan maksimal ≤ 2 ketukan dari detail pesanan.
- **NFR-03 Responsive:** Nyaman di smartphone, tablet, desktop.
- **NFR-04 Reliability:** Status pesanan konsisten di seluruh halaman.
- **NFR-05 Security:** Pengguna hanya dapat mengakses & mengelola pesanannya sendiri.

## 8. Business Rules
- Pesanan hanya dapat diselesaikan oleh pemilik pesanan.
- Tombol "Selesaikan Pesanan" aktif hanya setelah paket berstatus Diterima.
  "Dalam Perjalanan" bukan status terpisah; merupakan bagian dari Dikirim.
- Pesanan yang sudah Selesai tidak dapat dikembalikan ke status sebelumnya.
- Harga yang ditampilkan di beranda wajib sama dengan checkout.
- Iklan tidak boleh membuka aplikasi tanpa aksi pengguna dan tidak menghalangi aksi utama.
- Laporan masalah hanya dapat dibuat untuk pesanan yang valid milik pengguna.

## 9. User Stories

| ID | User Story |
|---|---|
| US-01 | As a pembeli Shopee, I want to melihat harga final yang sama sejak beranda sampai checkout, so that saya tidak merasa tertipu oleh promo. |
| US-02 | As a pembeli Shopee, I want to melihat rincian biaya tambahan sebelum membayar, so that saya paham apa yang saya bayar. |
| US-03 | As a pembeli Shopee, I want to menekan tombol "Selesaikan Pesanan" sendiri setelah barang diterima, so that saya tetap mengontrol pesanan dan pembayaran cicilan. |
| US-04 | As a pembeli Shopee, I want to memfilter daftar pesanan berdasarkan status, so that saya tidak bingung mana pesanan yang sudah beres. |
| US-05 | As a pembeli Shopee, I want to menutup iklan dengan satu ketukan tanpa terlempar ke aplikasi, so that aktivitas saya tidak terganggu dan pekerjaan saya tidak hilang. |
| US-06 | As a pembeli Shopee, I want to mendapat estimasi dan notifikasi bila pengiriman terlambat, so that saya tahu kapan paket akan sampai. |
| US-07 | As a pembeli Shopee, I want to melaporkan masalah pesanan langsung dari aplikasi, so that saya tidak perlu DM media sosial dan mengulang detail. |

## 10. Scope

**In Scope**
- Harga final & rincian biaya konsisten (beranda→checkout).
- Tombol Selesaikan Pesanan + pengingat selesai otomatis.
- Filter daftar pesanan per status.
- Kontrol iklan (tutup 1 ketukan, batas frekuensi).
- Estimasi + notifikasi keterlambatan.
- Pelaporan masalah in-app.
- Menu ShopeePay/SPayLater untuk pelunasan (UI "Lunasi Sekarang", tanpa backend).

**Out of Scope**
- Perubahan sistem pembayaran backend.
- Integrasi kurir/logistik baru.
- Fitur sosial/komunitas.
- Rekomendasi produk berbasis AI.
- Perubahan kebijakan refund di luar alur pelaporan.

## 11. Assumptions & Dependencies
**Assumptions**
- Pengguna telah login.
- Data status berasal dari sistem logistik yang terintegrasi.
- Notifikasi memerlukan izin perangkat.
- Sampel ulasan (10 ulasan) belum mewakili seluruh pengguna.

**Dependencies**
- Autentikasi pengguna.
- Layanan status pesanan/logistik.
- Layanan notifikasi push.
- Sistem pelaporan/CS.
- ShopeePay / SPayLater.

## 12. Expected Deliverables
- Halaman produk & checkout dengan harga final konsisten.
- Halaman detail pesanan dengan tombol "Selesaikan Pesanan".
- Daftar pesanan dengan filter per status.
- Komponen notifikasi keterlambatan.
- Form pelaporan masalah in-app.
- Deployment web (`apps/web`).

## 13. Product Acceptance Criteria
- Harga beranda = harga checkout = rincian.
- Pesanan dapat diselesaikan manual ≤ 2 ketukan.
- Status pesanan akurat & konsisten antar halaman.
- Daftar pesanan dapat difilter per status.
- Iklan dapat ditutup dalam 1 ketukan tanpa membuka aplikasi.
- Notifikasi keterlambatan terkirim.
- Laporan masalah dapat dikirim dari dalam aplikasi.

*End of PRD v2.0*

> Catatan: Seluruh isi diturunkan dari Worksheet 5–8. Konteks tambahan
> diambil dari Worksheet 3 (User Assumption) & 4 (Research Plan) sebagai
> referensi. Worksheet 9 (Content Inventory, Sitemap, Card Sorting)
> tidak dijadikan acuan.

---

## Deployment (Vercel — 5 langkah)

Deployment dilakukan **manual oleh pemilik repo**. Agent AI hanya
menyiapkan konfigurasi dan tidak menjalankan `vercel deploy`.

Deployment: https://rekayasa-interkasi-mocha.vercel.app/

1. **Login/daftar Vercel dengan akun GitHub.** Buka
   [vercel.com](https://vercel.com), pilih **Continue with GitHub**, lalu
   setujui akses Vercel ke akun GitHub Anda bila diminta.
2. **Import repo.** Di dashboard Vercel pilih **Add New… → Project**, lalu
   **Import** repository `Raynsar/Rekayasa-Interkasi`. Jika repo belum
   muncul, klik **Adjust GitHub App Permissions** dan centang repo tersebut.
3. **Konfigurasi proyek.** Isi pengaturan berikut persis:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `apps/web` (klik **Edit** dan pilih folder ini)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** biarkan default (`npm install`)

   File `apps/web/vercel.json` sudah berisi SPA rewrite
   (`/(.*)` → `/index.html`), sehingga route seperti `/orders/o-1`
   tidak 404 saat di-refresh. Tidak perlu variabel lingkungan untuk
   demo ini.
4. **Deploy.** Klik **Deploy** dan tunggu hingga build selesai. Panel
   *Build Logs* harus menampilkan `tsc --noEmit && vite build` berhasil;
   jika gagal, periksa bahwa Root Directory benar-benar `apps/web`.
5. **Salin URL publik.** Setelah status *Ready*, salin URL yang diberikan
   Vercel (format `https://<nama-proyek>.vercel.app`) dan kirim ke agent AI
   untuk dicatat sebagai commit kecil terpisah di `CHANGELOG.md` bagian
   `[Unreleased]`.

> Tidak ada token/secret yang disimpan di repository. Variabel lingkungan,
> bila diperlukan, ditambahkan langsung di dashboard Vercel oleh Anda.

## Validasi Visual

Bukti tampilan tersimpan di `docs/screenshots/` (root repo, bukan di
`apps/web`, sehingga tidak ikut build/deploy):

- Phase 3 — `phase3-{mobile,tablet,desktop}.png` (390/768/1440px).
- Phase 4 — `phase4-{mobile,tablet,desktop}.png` + `phase4-audit.json`.
- Phase 5 — `phase5/` berisi 20 screenshot (10 route × 390px/1440px)
  dan `audit.json` berisi hasil pemeriksaan DOM, gaya komputasi, dan
  overflow horizontal.

Hasil validasi Phase 5: 42/42 Acceptance Criteria Pass, 32/32 pemeriksaan
runtime, dan 8/8 skenario manual. Detail ada di `CHANGELOG.md` rilis
2.0.0 serta `docs/validation/phase5/`.