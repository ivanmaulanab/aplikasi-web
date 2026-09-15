# Dokumentasi Tugas Praktik Aplikasi Web — Pertemuan 3
**Sistem Peminjaman Ruang dan Peralatan Kampus "SIPINJAM"**  
**Program Studi Informatika — Mata Kuliah: Praktik Aplikasi Web (INF60295)**

---

## 1. Identitas Proyek & Anggota Tim

- **Nama Produk**: SIPINJAM (Sistem Peminjaman Ruang dan Peralatan Kampus)
- **Topik Pembahasan Pertemuan 3**: Information Architecture, Sitemap, User Flow, Wireframe (Desktop & Mobile), Interactive Prototype, Usability Walkthrough, dan Design Decisions.
- **Branch Kerja**: `risky-job3`

### Susunan Anggota Kelompok
| No | Nama Lengkap | NIM | Peran & Kontribusi Utama |
| :---: | :--- | :---: | :--- |
| **1** | **Ivan Maulana Bahtiar** | 24051130047 | Penyusunan Problem Statement & Product Vision Pertemuan 2; Review Arsitektur Informasi & Keselarasan Visi Produk pada Pertemuan 3. |
| **2** | **Yuki Ramadhan** | 24051130053 | Penulisan 10 User Story & Pengujian Prinsip INVEST Pertemuan 2; Review Keterlacakan Matriks Kebutuhan (Traceability Matrix). |
| **3** | **Risky Aditya Pratama** | 24051130057 | **Penanggung Jawab Utama Pengerjaan Job Pertemuan 3**; Perancangan Scope Canvas, Sitemap, User Flow (Mahasiswa & Petugas), Wireframe Desktop (D01–D04) & Mobile (M01–M04), Spesifikasi Prototipe Interaktif, Usability Walkthrough, Log Keputusan Desain, Figma Blueprint, dan Kompilasi Berkas PDF. |
| **4** | **Arfa Novan Akbar** | 24051130058 | Penyusunan Persona Canvas Pertemuan 2; Validasi Skenario Pengujian Usability Persona Rani & Pak Yusuf pada Pertemuan 3. |

---

## 2. Ringkasan Ruang Lingkup (Scope Pertemuan 3)

Berdasarkan Product Backlog hasil Pertemuan 2, iterasi Pertemuan 3 berfokus pada 5 User Story inti (*Core Scope*):
1. **US-01 (Must, 5 SP)**: Mahasiswa mencari ruang tersedia berdasarkan tanggal dan kapasitas peserta.
2. **US-02 (Must, 5 SP)**: Mahasiswa mengajukan peminjaman ruang secara daring melalui formulir ringkas.
3. **US-03 (Should, 3 SP)**: Mahasiswa memantau status persetujuan pengajuan melalui bukti tiket digital.
4. **US-07 (Must, 5 SP)**: Petugas Sarana & Prasarana memverifikasi berkas pengajuan masuk dan mendeteksi bentrok jadwal.
5. **US-09 (Should, 3 SP)**: Petugas Sarana & Prasarana menolak pengajuan bermasalah dengan kewajiban mengisi alasan penolakan.

*Fitur Out of Scope (Iterasi Berikutnya)*: Peminjaman peralatan terpisah/bersamaan (US-06), kalender matriks penuh per jam (US-08), pembatalan mandiri (US-04), riwayat arsip masa lalu (US-05), dan manajemen CRUD master data ruang (US-10).

---

## 3. Struktur Berkas & Artefak Deliverables

Folder `Pertemuan03/` ini berisi seluruh berkas resmi tugas sesuai pedoman modul mata kuliah:

```
Pertemuan03/
├── 01-scope-canvas.pdf          <- Dokumen PDF Resmi Scope Canvas
├── 01-scope-canvas.md           <- Source Markdown Scope Canvas
├── 02-sitemap.pdf               <- Dokumen PDF Resmi Sitemap & Arsitektur Informasi
├── 02-sitemap.md                <- Source Markdown Sitemap
├── 03-user-flow-pengguna.pdf    <- Dokumen PDF Resmi User Flow Mahasiswa (Happy & Failure Path)
├── 03-user-flow-pengguna.md     <- Source Markdown User Flow Mahasiswa
├── 04-user-flow-admin.pdf       <- Dokumen PDF Resmi User Flow Petugas Sarpras
├── 04-user-flow-admin.md        <- Source Markdown User Flow Petugas
├── 05-wireframe-desktop.pdf     <- Dokumen PDF Spesifikasi Wireframe Desktop (1440x900 px)
├── 05-wireframe-desktop.md      <- Source Markdown Wireframe Desktop
├── 06-wireframe-mobile.pdf      <- Dokumen PDF Spesifikasi Wireframe Mobile (390x844 px)
├── 06-wireframe-mobile.md       <- Source Markdown Wireframe Mobile
├── 06-prototype.md              <- Spesifikasi Alur Interaktif & Hotspot Prototipe
├── 07-usability-walkthrough.pdf <- Dokumen PDF Resmi Usability Walkthrough (5 Temuan & 3 Revisi)
├── 07-usability-walkthrough.md  <- Source Markdown Usability Walkthrough
├── 08-keputusan-desain.md       <- Dokumentasi 6 Keputusan Desain Terstruktur
├── FIGMA-BLUEPRINT.md           <- Panduan Teknis Komponen, Tata Letak, & Auto Layout untuk Figma
├── traceability-matrix.md       <- Matriks Ketertelusuran US -> AC -> Layar -> State -> Prototipe
└── README.md                    <- Dokumentasi Utama Direktori Pertemuan 3 (File Ini)
```

---

## 4. Tautan & Panduan Figma

> [!NOTE]
> Karena perancangan dilakukan secara lokal di lingkungan repositori kode, tautan daring Figma eksternal tidak dikarang (*no dummy external link*). Sebagai gantinya, seluruh panduan posisi absolut/relatif, ukuran frame, kode warna HEX, margin, padding, tipografi, dan koneksi *prototype noodles* telah didokumentasikan secara rinci pada berkas:
> 👉 [FIGMA-BLUEPRINT.md](file:///c:/Users/MSI%20NOTEBOOK/Documents/Kulyeah/aplikasi-web/Pertemuan03/FIGMA-BLUEPRINT.md)

---

## 5. Ringkasan Keputusan Desain & Usabilitas

1. **Mobile-First untuk Mahasiswa**: Resolusi 390 × 844 px menjamin kemudahan pengajuan dengan satu tangan oleh Rani di sela aktivitas kampus.
2. **Desktop-First untuk Petugas**: Resolusi 1440 × 900 px dengan format tabel data padat memudahkan Pak Yusuf memindai puluhan pengajuan per minggu secara efisien.
3. **Pemberian Umpan Balik Cepat**: Komponen *Vertical Stepper Timeline* pada tiket pengajuan menghilangkan kecemasan mahasiswa mengenai progres berkas permohonan.
4. **Pencegahan Kesalahan Bentrok**: Deteksi bentrok jadwal otomatis pada sisi petugas mencegah terjadinya pemberian izin ganda (*double booking*) pada ruang yang sama.
5. **Penolakan Akuntabel**: Penolakan wajib disertai catatan alasan, memangkas komunikasi manual melalui WhatsApp atau tatap muka yang tidak tercatat.
