# DESIGN SYSTEM

Project: Peningkatan Pengalaman Pelacakan Pesanan Shopee
Version: 2.0
Status: Draft
Reference: PRD.md v2.0, UX-SPEC.md v2.0

## 1. Design Direction

### 1.1 Design Concept
Trustworthy Commerce, Clear Control â€” antarmuka e-commerce yang bersih,
tegas pada aksi utama, dan minim gangguan.

Karakteristik:
- Hierarki jelas antara harga, status, dan aksi.
- Aksen oranye Shopee sebagai warna utama aksi.
- Ruang lega agar kartu pesanan mudah dipindai.
- Iklan tidak pernah menutupi aksi utama.
- Responsif di mobile, tablet, desktop.

### 1.2 Design Principles
- **Clarity:** harga & status terbaca langsung.
- **Control:** aksi utama menonjol dan dapat dikonfirmasi.
- **Consistency:** harga & status sama di semua halaman.
- **Accessibility:** status tidak hanya warna.
- **Scalability:** komponen dapat dipakai ulang.

## 2. Color System

### 2.1 Primary Colors

| Token | Hex | Usage |
|---|---|---|
| Primary | #EE4D2D | Tombol aksi utama, aksen |
| Primary Hover | #D73211 | Hover tombol |
| Primary Light | #FFF1ED | Highlight & selected |
| Primary Dark | #B72709 | Emphasis aktif |

### 2.2 Neutral Colors

| Token | Hex | Usage |
|---|---|---|
| Background | #F5F5F5 | Latar utama |
| Surface | #FFFFFF | Kartu & panel |
| Surface Secondary | #FAFAFA | Latar sekunder |
| Border | #E5E5E5 | Divider & border |
| Text Primary | #212121 | Judul & teks utama |
| Text Secondary | #757575 | Teks pendukung |
| Text Muted | #BDBDBD | Placeholder & disabled |

### 2.3 Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| Success | #2E7D32 | Pesanan selesai |
| Success Light | #E8F5E9 | Latar sukses |
| Warning | #F57C00 | Keterlambatan |
| Warning Light | #FFF3E0 | Latar peringatan |
| Danger | #D32F2F | Gagal / dibatalkan |
| Danger Light | #FDECEA | Latar error |
| Info | #1976D2 | Informasi & pengingat |

### 2.4 Order Status Colors

| Status | Text Color | Background |
|---|---|---|
| Belum Bayar | #757575 | #FAFAFA |
| Dikemas | #1976D2 | #E3F2FD |
| Dikirim | #EE4D2D | #FFF1ED |
| Diterima | #2E7D32 | #E8F5E9 |
| Selesai | #2E7D32 | #E8F5E9 |
| Dibatalkan | #D32F2F | #FDECEA |

Warna status tidak boleh jadi satu-satunya penanda; selalu sertakan label.

## 3. Typography System

### 3.1 Font Family
Primary: Inter â€” Fallback: system-ui, sans-serif.

### 3.2 Scale

| Token | Size | Weight | Usage |
|---|---|---|---|
| Display | 32px | 700 | Highlight dashboard |
| H1 | 28px | 700 | Judul halaman |
| H2 | 22px | 600 | Judul seksi |
| H3 | 18px | 600 | Judul kartu |
| Body Large | 16px | 400 | Konten utama |
| Body | 14px | 400 | Teks default |
| Body Small | 13px | 400 | Teks pendukung |
| Caption | 12px | 400 | Metadata |

Line height: Heading 1.2â€“1.4 Â· Body 1.5 Â· Caption 1.4.

## 4. Spacing System
Kelipatan 4px: space-1 4 Â· space-2 8 Â· space-3 12 Â· space-4 16 Â·
space-5 20 Â· space-6 24 Â· space-8 32 Â· space-10 40 Â· space-12 48.

## 5. Layout System

### 5.1 Main Layout
- Desktop: Sidebar 240px, konten fleksibel, padding 32px, max width 1440px.
- Tablet: Sidebar collapsible, padding 24px.
- Mobile: Satu kolom, padding 16px, navigasi bawah, aksi full-width.

### 5.2 Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 640px | Satu kolom |
| Tablet | 640â€“1023px | Layout adaptif |
| Desktop | â‰¥ 1024px | Sidebar |
| Wide | â‰¥ 1440px | Max width |

## 6. Component Specifications

### 6.1 Buttons
Primary, Secondary, Outline, Ghost, Danger, Icon. Tinggi 40px,
padding 16px, radius 8px, font 14px/600, transisi 150ms.
Size: S 32 Â· M 40 Â· L 48.

### 6.2 Input Fields
Text, Textarea, Select, Search, Date Picker. Tinggi 40px,
border 1px #E5E5E5, radius 8px, padding 12px, font 14px.

### 6.3 Cards (Order Card & Product Card)
Background #FFF, border 1px #E5E5E5, radius 12px, padding 16â€“20px,
shadow halus, spacing 16px.

### 6.4 Status Badge
Radius 999px, padding 4px 10px, font 12px/500. Variant: Belum Bayar,
Dikemas, Dikirim, Diterima, Selesai, Dibatalkan.

### 6.5 Tabs / Filter Bar
Tab horizontal scrollable di mobile, indikator aktif primary,
menampilkan jumlah per status.

### 6.6 Modal / Bottom Sheet
Background putih, radius 12px, max width 480px, padding 24px, overlay
gelap. Dipakai untuk konfirmasi "Selesaikan Pesanan" dan lapor masalah.

### 6.7 Price Breakdown (Expandable Row)
Baris dapat dibuka/ditutup, chevron indikator, total tebal di baris akhir.
Dipakai di halaman produk, keranjang, checkout, & detail pesanan.

### 6.8 Toast Notification
Success, Error, Warning, Info. Desktop top-right, mobile top.
Durasi 3â€“5 detik; error penting tetap sampai ditutup.

### 6.9 Ad Close Button
Area sentuh minimal 44Ã—44px, ikon X jelas, tidak memicu deep-link.

## 7. Iconography
Gunakan Lucide Icons. Ukuran 16/20/24px. Ikon aksi wajib punya label
aksesibel.
Contoh: Package (Pesanan), Truck (Dikirim), CheckCircle (Selesai),
AlertTriangle (Terlambat), Filter, Search, X (tutup iklan), Flag (lapor).

## 8. Design Tokens

```json
{
  "color": {
    "primary": "#EE4D2D",
    "background": "#F5F5F5",
    "surface": "#FFFFFF",
    "textPrimary": "#212121",
    "textSecondary": "#757575",
    "success": "#2E7D32",
    "warning": "#F57C00",
    "danger": "#D32F2F"
  },
  "radius": { "sm": "6px", "md": "8px", "lg": "12px", "full": "999px" },
  "spacing": { "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px", "xl": "32px" },
  "touchTarget": { "min": "44px" }
}
```

Design tokens wajib dipakai ulang, hindari nilai acak.

## 9. Accessibility Guidelines
Kontras teks/latar memadai.
Status tidak hanya lewat warna.
Label pada input.
Keyboard accessible.
Fokus terlihat.
Label aksesibel untuk ikon-only.
Area sentuh minimal 44Ã—44px (termasuk tombol tutup iklan).
## 10. Design Consistency Rules
Pakai ulang komponen sebelum membuat baru.
Tidak menambah warna tanpa persetujuan.
Spacing & hierarki konsisten.
Varian tombol sama antar halaman.
Indikator status konsisten.
Semua layout mengikuti breakpoint.
End of DESIGN-SYSTEM v2.0

Catatan: Worksheet tidak menyebut hex/font spesifik; nilai warna oranye
Shopee dan tipografi di sini adalah asumsi wajar, terbuka untuk disesuaikan.

> Catatan Phase 2: blok INTERACTION SPECIFICATION dipindahkan ke
> `INTERACTION-SPEC.md`. Tidak ada konten DESIGN-SYSTEM yang ikut dipindah.
