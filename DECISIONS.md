# DECISIONS

Project: Peningkatan Pengalaman Pelacakan Pesanan Shopee
Varian: **B — PRD + UX Skill**
Berlaku sejak: Phase 2

Aturan dokumentasi yang disepakati pengguna: boleh membuat dan memperbarui
`CHANGELOG.md` dan `DECISIONS.md`; file `.md` lain hanya jika diminta.
File yang diminta pada Phase 2: `README.md`, `INTERACTION-SPEC.md`, revisi
`PRD.md`, `AGENTS.md`, `ACCEPTANCE-CRITERIA.md`, `DESIGN-SYSTEM.md`.

## 1. Keputusan Phase 1 (dikonfirmasi pengguna)

| ID | Keputusan | Sumber | Dampak |
|---|---|---|---|
| D-01 | Mengerjakan **Varian B — PRD + UX Skill** | Jawaban Phase 1 | Deliverable: README/PRD, CHANGELOG, UX Skill, AGENTS.md, `apps/web` |
| D-02 | `git init` lokal + `git remote add origin https://github.com/Raynsar/Rekayasa-Interkasi.git`; **tidak push** | Jawaban Phase 1 | Push manual dilakukan pengguna |
| D-03 | Buat `README.md` dari `PRD.md`; `PRD.md` tetap dipertahankan | Jawaban Phase 1 | README berisi PRD + instruksi deploy |
| D-04 | Pisahkan blok INTERACTION SPEC keluar dari `DESIGN-SYSTEM.md` | Jawaban Phase 1 | `INTERACTION-SPEC.md` menjadi file mandiri |
| D-05 | `CHANGELOG.md` dibuat di **Phase 6** | Jawaban Phase 1 | **Digantikan D-23** — dibuat di Phase 2 |
| D-06 | Auto-selesai **hanya** jika pengguna memilih "Tunggu Otomatis" pada pengingat 24 jam | Jawaban Phase 1 (opsi a) | FR-02 & aturan terkait direvisi |
| D-07 | Status kanonik: Belum Bayar, Dikemas, Dikirim, Diterima, Selesai, Dibatalkan. "Dalam Perjalanan" bukan status terpisah; Diterima bukan tab filter | Jawaban Phase 1 | Enum & tab filter diselaraskan di semua dokumen |
| D-08 | Tab filter final: Semua, Belum Bayar, Dikemas, Dikirim, Selesai, Dibatalkan | Jawaban Phase 1 | Dipakai `FilterTabs` di Phase 3 |
| D-09 | AC-010 SPayLater **tetap dikerjakan**, cukup UI tombol "Lunasi Sekarang", tanpa backend pembayaran | Jawaban Phase 1 | Masuk fase UI + fungsi in-app |
| D-10 | Stack: React + TypeScript + Vite + CSS variables + Lucide + localStorage + Vitest/Testing Library | Jawaban Phase 1 | Digunakan di `apps/web` |
| D-11 | Notifikasi cukup toast/notification center in-app + data seed persisten di localStorage; delay detection = bandingkan "waktu sekarang" vs batas akhir rentang | Jawaban Phase 1 | Tanpa Web Push/service worker/backend |
| D-12 | Deploy Vercel oleh **pengguna**; agent hanya menyiapkan proyek Vercel-ready + instruksi 3 langkah | Jawaban Phase 1 | Tidak ada `vercel deploy`, tanpa token |

## 2. Keputusan Phase 2 (teknis & dokumentasi)

| ID | Keputusan | Alasan |
|---|---|---|
| D-13 | Branch lokal bernama `main`; remote bernama `origin` | Konvensi default GitHub/Vercel |
| D-14 | `DESIGN-SYSTEM.md` dibersihkan: penutup blok JSON ditambahkan, heading `## 9`/`## 10` diperbaiki, stray `shell`/`---` dan seluruh blok INTERACTION dihapus | Blok JSON sebelumnya tidak tertutup sehingga menyalahi render markdown; sesuai syarat "tidak ada bagian DESIGN-SYSTEM yang ikut terpindah" |
| D-15 | `INTERACTION-SPEC.md` dibuat dari konten interaksi saja, ditambah Bagian 0 (status kanonik & auto-selesai) dan penyesuaian 5.2/5.3/5.4/6.1/7.2 | Sesuai keputusan D-06, D-07, D-11, D-12 |
| D-16 | `ACCEPTANCE-CRITERIA.md` tidak mengubah AC-001…AC-042; hanya ditambah §2.1 berisi status kanonik & auto-selesai | Sesuai aturan tambahan pengguna: AC tidak diubah |
| D-17 | Versi dependency menggunakan caret (`^`) pada `package.json`; lockfile dihasilkan oleh `npm install` | Reproducibility build Vercel |
| D-18 | Vite SPA + `vercel.json` berisi rewrite `/(.*) → /index.html` | Client-side routing tetap berfungsi saat di-refresh di Vercel |
| D-19 | Token desain ditaruh di `src/styles/tokens.css` sebagai CSS variables, bukan hardcode warna di komponen | Sesuai DESIGN-SYSTEM §8 "design tokens wajib dipakai ulang" |
| D-20 | `src/App.tsx` pada Phase 2 hanya scaffold minimal dan akan diganti di Phase 3 | Agent tidak boleh mengklaim UI selesai di Phase 2 |
| D-21 | Data seed demo disimpan sebagai konstanta di `src/services/` dan dipersistenkan via `localStorage`; bukan data dummy final | Sesuai D-11 + AGENTS.md §6.8 (persistensi) |
| D-22 | Vitest dinaikkan ke `^5.1.1` (dari `^3.2.4`) | `npm audit` awal melaporkan 2 critical + 1 moderate pada `tinypool`/`@vitest/mocker`; versi 5 kompatibel dengan Vite 7 & Node 24 dan menghasilkan 0 vulnerabilities |
| D-23 | `CHANGELOG.md` dibuat **di Phase 2**, menggantikan D-05; entri `[Unreleased]` wajib diperbarui di akhir Phase 3, 4, 5, dan 6 | Jawaban Phase 2 — jangan tunda pencatatan sampai akhir proyek |
| D-24 | Stray `shell`/`markdown` di `UX-SPEC.md` dibersihkan di Phase 3, dengan verifikasi heading & blok kode tidak rusak | Jawaban Phase 2 |
| D-25 | Screenshot validasi disimpan di `docs/screenshots/` di root repo, sehingga tidak ikut build/deploy `apps/web` | Jawaban Phase 3 | File: `phase3-mobile.png`, `phase3-tablet.png`, `phase3-desktop.png`; tidak ter-ignore `.gitignore` |
| D-26 | Agent diizinkan `git commit` & `git push` ke `origin/main` mulai Phase 3; aturan "jangan push" Phase 1 dicabut | Jawaban Phase 3 | **Tetap dilarang:** `vercel deploy`, force push, dan menyimpan token/secret di source |
| D-27 | Strategi commit: **satu commit per fase** dengan Conventional Commits berbahasa Inggris | Jawaban Phase 3 | `chore(phase2): …`, `feat(phase3): …`, dst. |

## 3. Konflik yang dicatat (tidak dihapus)

1. **FR-02 vs prompt/AC-007:** PRD lama melarang auto-selesai tanpa konfirmasi,
   sementara AC-007 menyebut pengingat 24 jam sebelum auto-selesai.
   → Diselesaikan dengan D-06: auto-selesai hanya setelah pengingat **dan**
   pilihan "Tunggu Otomatis".
2. **Enum status tidak konsisten:** AGENTS.md/PRD lama memakai "Dalam
   Perjalanan"; INTERACTION-SPEC lama memakai tab tanpa "Diterima".
   → Diselesaikan dengan D-07/D-08; kata "Dalam Perjalanan" kini hanya
   muncul dalam kalimat penjelas "bukan status terpisah".
3. **Nama file dokumen:** prompt menyebut README.md/INTERACTION-SPEC.md/
   CHANGELOG.md, sedangkan repo lokal berisi PRD.md dan blok INTERACTION
   menumpang. → Diselesaikan dengan D-03/D-04/D-05.
4. **FR-07 di luar 7 daftar fitur prompt:** tetap dikerjakan sebagai bagian
   dari fitur #2 sesuai D-09.
5. **Push & deploy:** agent tidak push dan tidak deploy sesuai D-02/D-12.

## 4. Verifikasi grep setelah revisi dokumen

Perintah yang dijalankan (root repo):

- `grep -ri "auto-selesai tanpa konfirmasi" --include=*.md .`
  → **0 hasil** (frasa lama sudah hilang).
- `grep -ri "Dalam Perjalanan" --include=*.md .`
  → 9 hasil, semuanya berupa penegasan "bukan status terpisah; bagian dari
  Dikirim" di ACCEPTANCE-CRITERIA.md, INTERACTION-SPEC.md, PRD.md,
  README.md, dan AGENTS.md. Tidak ada yang memakainya sebagai status/tab.
- `grep -ri "Semua, Belum Bayar, Dikemas, Dikirim, Selesai, Dibatalkan" --include=*.md .`
  → hasil di ACCEPTANCE-CRITERIA.md §2.1 dan INTERACTION-SPEC.md §0/§4;
  PRD.md/README.md memuat daftar yang sama dengan pemisah baris.

Status verifikasi: **Lulus**.

## 5. Verifikasi setup Phase 2

| Perintah | Hasil |
|---|---|
| `git init`, `git branch -M main`, `git remote add origin …` | berhasil; remote `origin` terdaftar; **tidak ada push** |
| `npm install` di `apps/web` | berhasil; `package-lock.json` dibuat |
| `npm run build` | berhasil; output `apps/web/dist` |
| `npx vitest run --passWithNoTests` | berhasil (belum ada test file di Phase 2) |
| `npm audit` | 0 vulnerabilities setelah D-22 |
| `git status --short` | `dist/`, `node_modules/` tidak muncul (ter-ignore) |
