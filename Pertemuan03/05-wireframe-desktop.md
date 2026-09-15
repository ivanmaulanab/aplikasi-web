# Lembar Kerja 5: Spesifikasi Wireframe Desktop (Petugas Sarpras)
**Praktik Aplikasi Web (INF60295) — Pertemuan 3**  
**Sistem Peminjaman Ruang dan Peralatan Kampus "SIPINJAM"**

---

### Informasi Tim
- **Ivan Maulana Bahtiar** (24051130047)
- **Yuki Ramadhan** (24051130053)
- **Risky Aditya Pratama** (24051130057)
- **Arfa Novan Akbar** (24051130058)

---

## 1. Spesifikasi Teknis Wireframe Desktop

- **Ukuran Frame Standar**: 1440 × 900 px (Aspek Rasio 16:10 Laptop/Desktop Standar)
- **Grid Layout**: 12 Kolom, Margin 32 px, Gutter 24 px
- **Gaya Desain**: *Low-Fidelity Clean* (Dominan grayscale: `#FFFFFF`, `#F8FAFC`, `#E2E8F0`, `#64748B`, `#1E293B`; aksen keputusan: Hijau Status `#16A34A`, Merah Peringatan `#DC2626`)
- **Pengguna Sasaran**: Pak Yusuf (Petugas Sarana & Prasarana)
- **User Story Terkait**: `US-07`, `US-09`
- **Acceptance Criteria**: `AC-10`, `AC-11`, `AC-12`

---

## 2. Struktur Layar Desktop

```
+----------------------------------------------------------------------------------------------------+
| TOPBAR: SIPINJAM SARPRAS ADMIN                                            [Profil: Pak Yusuf v]    |
+-------------------+--------------------------------------------------------------------------------+
| SIDEBAR (240px)   | MAIN CONTENT AREA (1200px)                                                     |
|                   |                                                                                |
| [o] Dashboard     | [ Breadcrumb: Dashboard > ... ]                                                |
| [=] Daftar        |                                                                                |
|     Pengajuan     |                                                                                |
| [x] Jadwal Ruang  |                                                                                |
| [*] Pengaturan    |                                                                                |
|                   |                                                                                |
|                   |                                                                                |
| [<-] Logout       |                                                                                |
+-------------------+--------------------------------------------------------------------------------+
```

---

## 3. Rincian Layar & Komponen Desktop

### D01 — Dashboard Petugas (1440 × 900 px)
- **Tujuan**: Memberikan ikhtisar cepat volume pengajuan yang membutuhkan tindakan verifikasi segera.
- **Tata Letak & Komponen**:
  1. **Sidebar Navigasi (Kiri, W: 240px)**: Logo SIPINJAM, Menu Dashboard (aktif), Menu Daftar Pengajuan, Menu Kalender Jadwal, Tombol Logout.
  2. **Header Konten**: Salam *"Selamat Datang, Pak Yusuf"*, Tanggal hari ini, Status sistem aktif.
  3. **Row Kartu Metrik Ringkasan (4 Kartu)**:
     - Kartu 1: *Total Pengajuan Bulan Ini* (Nilai: 42)
     - Kartu 2: *Menunggu Verifikasi* (Nilai: 7, Aksen Kuning/Oranye - Prioritas Tindakan)
     - Kartu 3: *Disetujui* (Nilai: 31, Aksen Hijau)
     - Kartu 4: *Ditolak* (Nilai: 4, Aksen Merah)
  4. **Tabel Pengajuan Terbaru (5 Data Terakhir)**:
     - Kolom: ID Pengajuan, Tanggal Diajukan, Nama Mahasiswa/Ormawa, Ruang yang Dipinjam, Tanggal Pemakaian, Status Badge, Aksi ("Periksa").
  5. **Widget Pintasan Status Ruang**: Tampilan mini ketersediaan 3 ruang utama hari ini.

### D02 — Daftar Pengajuan (1440 × 900 px)
- **Tujuan**: Menyediakan fasilitas pengelolaan, pencarian, dan penyaringan seluruh berkas permohonan masuk.
- **Tata Letak & Komponen**:
  1. **Sidebar Navigasi**: Menu Daftar Pengajuan dalam state aktif.
  2. **Toolbar Filter & Search**:
     - *Search Bar* (Placeholder: "Cari ID Pengajuan, Nama Pemohon, atau Ruang...")
     - *Dropdown Filter Status*: "Semua Status", "Menunggu Verifikasi", "Disetujui", "Ditolak"
     - *Date Picker Filter*: Rentang tanggal pemakaian
  3. **Tabel Data Pengajuan Komprehensif**:
     - Kolom 1: `# ID` (misal: `#SPJ-0824`)
     - Kolom 2: `Pemohon` (misal: Rani - BEM Fakultas)
     - Kolom 3: `Ruang` (misal: Ruang Seminar B)
     - Kolom 4: `Jadwal Acara` (misal: 20 Sep 2026, 09.00 - 12.00)
     - Kolom 5: `Peserta` (misal: 50 Orang)
     - Kolom 6: `Status` (Badge: Menunggu Verifikasi)
     - Kolom 7: `Aksi` (Tombol tombol button outlined: "Lihat Detail")
  4. **Pagination**: Menampilkan "Menampilkan 1-10 dari 42 data" dengan navigasi halaman 1, 2, 3, Next.

### D03 — Detail & Verifikasi Pengajuan (1440 × 900 px)
- **Tujuan**: Halaman periksa rincian sebelum petugas memutuskan menyetujui atau menolak permohonan.
- **Tata Letak & Komponen**:
  1. **Top Header**: Tombol Back `<- Kembali ke Daftar`, Judul Halaman `Detail Pengajuan #SPJ-0824`, Badge Status `Menunggu Verifikasi`.
  2. **Grid Konten (2 Kolom Layout)**:
     - **Kolom Kiri (Data Pemohon & Acara, W: 65%)**:
       - Kartu Profil Pemohon: Nama Lengkap (Rani), NIM, Organisasi (BEM), Kontak HP/WhatsApp, Email Mahasiswa.
       - Kartu Detail Peminjaman: Nama Ruang (Ruang Seminar B, Gedung C Lt. 2), Tanggal Acara, Sesi Waktu (09.00 - 12.00 WIB), Estimasi Peserta (50 orang), Deskripsi Keperluan Acara.
       - Dokumen Lampiran: Tautan surat izin ormawa / proposal pendukung (`proposal_kegiatan.pdf`).
     - **Kolom Kanan (Panel Pengecekan Sistem & Keputusan, W: 35%)**:
       - *Deteksi Bentrok Jadwal Box*:
         - **State Normal/Aman**: Indikator checklist hijau *"Ruang Seminar B tersedia penuh pada jam 09.00 - 12.00 WIB. Tidak ada jadwal tumpang tindih."*
         - **State Alert Bentrok (`D03-ALERT`)**: Box merah tebal dengan ikon peringatan *"PERINGATAN SISTEM: Ditemukan jadwal bentrok! Ruang ini telah disetujui untuk #SPJ-0790 (Himpunan Mahasiswa, 10.00 - 14.00 WIB)."*
       - *Action Decision Box*:
         - Tombol Sekunder Merah: `Tolak Pengajuan` (Memicu pembukaan modal `D04`)
         - Tombol Utama Hijau: `Setujui Pengajuan` (Memicu persetujuan instan dan perubahan status)

### D04 — Modal Dialog Tolak Pengajuan (Overlay Dialog pada D03)
- **Tujuan**: Menghindari penolakan sepihak tanpa alasan dengan mewajibkan penginputan catatan penolakan.
- **Tata Letak & Komponen**:
  1. **Backdrop Gelap Semi-Transparan**: Menutup layar `D03` dengan opacity 50%.
  2. **Card Modal Pop-up (Tengah Layar, W: 520px, H: Auto)**:
     - Header Modal: Judul *"Tolak Pengajuan Peminjaman"*, tombol silang tutup (*close button* `X`).
     - Sub-info: Menampilkan nomor pengajuan `#SPJ-0824` dan Pemohon `Rani (BEM)`.
     - Input Area: Label *"Alasan Penolakan (Wajib Diisi)*", Textarea multi-baris dengan placeholder *"Tuliskan alasan penolakan secara jelas agar pemohon dapat merevisi atau memilih jadwal lain..."*.
     - Catatan Sistem: *"Catatan penolakan ini akan langsung dikirimkan ke status tiket mahasiswa."*
     - Tombol Aksi (Kanan Bawah):
       - Tombol Gray Ghost: `Batal` (Menutup modal tanpa perubahan data)
       - Tombol Solid Red: `Tolak Pengajuan` (Menyimpan alasan penolakan dan mengubah status)

---

## 4. State Khusus Wireframe Desktop

1. **State `D03-APPROVED`**:
   - Status badge di bagian atas berubah menjadi hijau `Disetujui`.
   - Panel tombol aksi "Setujui" dan "Tolak" disembunyikan.
   - Digantikan oleh keterangan: *"Pengajuan telah disetujui oleh Pak Yusuf pada 16/09/2026 pukul 09.15 WIB. Mahasiswa telah diberi tahu."*
2. **State `D03-REJECTED`**:
   - Status badge berubah menjadi merah `Ditolak`.
   - Menampilkan kotak informasi alasan penolakan: *"Alasan: Jadwal bentrok dengan agenda resmi jurusan. Disarankan memindahkan ke hari Kamis di jam yang sama."*
   - Tombol aksi dinonaktifkan.
