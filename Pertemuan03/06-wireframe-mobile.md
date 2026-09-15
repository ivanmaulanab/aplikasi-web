# Lembar Kerja 6: Spesifikasi Wireframe Mobile (Mahasiswa)
**Praktik Aplikasi Web (INF60295) — Pertemuan 3**  
**Sistem Peminjaman Ruang dan Peralatan Kampus "SIPINJAM"**

---

### Informasi Tim
- **Ivan Maulana Bahtiar** (24051130047)
- **Yuki Ramadhan** (24051130053)
- **Risky Aditya Pratama** (24051130057)
- **Arfa Novan Akbar** (24051130058)

---

## 1. Spesifikasi Teknis Wireframe Mobile

- **Ukuran Frame Standar**: 390 × 844 px (Standar Smartphone Layar Sentuh iOS/Android)
- **Grid Layout**: 4 Kolom, Margin 16 px, Gutter 12 px
- **Gaya Desain**: *Low-Fidelity Clean & Touch-Friendly* (Ukuran tombol $\ge 44$ px untuk kenyamanan sentuhan jempol, kontras teks tinggi, dominan grayscale dengan aksen status terstandarisasi)
- **Pengguna Sasaran**: Rani (Ketua Panitia Mahasiswa)
- **User Story Terkait**: `US-01`, `US-02`, `US-03`
- **Acceptance Criteria**: `AC-01`, `AC-02`, `AC-03`, `AC-04`, `AC-05`, `AC-06`

---

## 2. Struktur Layar Mobile

```
+-----------------------------------+
| [9:41]                [Wifi][Bat] |  Status Bar (H: 44px)
+-----------------------------------+
| SIPINJAM                 [Avatar] |  Top Bar (H: 56px)
+-----------------------------------+
|                                   |
| MAIN CONTENT AREA (Scrollable)    |
| (Widget, Filter, Cards, Form)     |
|                                   |
+-----------------------------------+
| [Beranda]  [Cari]  [Status/Tiket] |  Bottom Navigation (H: 64px)
+-----------------------------------+
```

---

## 3. Rincian Layar & Komponen Mobile

### M01 — Beranda / Cari Ruang (390 × 844 px)
- **Tujuan**: Memungkinkan mahasiswa mencari ketersediaan ruang kampus berdasarkan tanggal dan kapasitas peserta secara cepat.
- **Tata Letak & Komponen**:
  1. **Top Header**: Logo teks "SIPINJAM", ikon avatar profil mahasiswa (Rani).
  2. **Banner Sapaan**: *"Halo, Rani! Butuh ruang untuk kegiatan ormawa?"*
  3. **Widget Card Pencarian Ruang (Fokus Utama)**:
     - Label: *"Cari Ketersediaan Ruang"*
     - Input Field 1: Tanggal Pemakaian (Date picker format `DD/MM/YYYY`, misal: `20/09/2026`).
     - Input Field 2: Estimasi Kapasitas Peserta (Number input dengan placeholder `"Contoh: 50 orang"`).
     - Tombol CTA Utama: `"Cari Ruang"` (Lebar penuh / *full-width*, tinggi 48 px, background hitam/abu tua).
  4. **Section Ruang Populer**:
     - Judul bagian: *"Rekomendasi Ruang Kampus"*
     - Card Horizontal/Vertikal:
       - Card 1: *Ruang Seminar B* (Kapasitas 60 orang, Gedung C, Status: Tersedia).
       - Card 2: *Aula Utama Gedung A* (Kapasitas 150 orang, Gedung A, Status: Tersedia).
       - Card 3: *Laboratorium Komputer 2* (Kapasitas 35 orang, Gedung B).
  5. **Bottom Navigation Bar (Fixed di Bawah)**:
     - Tab 1: Beranda (Aktif)
     - Tab 2: Cari Ruang
     - Tab 3: Status Pengajuan (Badge notifikasi)

### M02 — Detail Ruang (390 × 844 px)
- **Tujuan**: Menampilkan informasi rinci fasilitas dan spesifikasi ruang sebelum mahasiswa melanjutkan pengajuan.
- **Tata Letak & Komponen**:
  1. **Top Bar**: Tombol panah kembali `<- Kembali`, Judul *"Detail Ruang"*, tombol simpan/bookmark.
  2. **Placeholder Foto Ruang (W: 358px, H: 180px)**: Kotak gambar wireframe abu-abu berikon foto dengan label nama ruang.
  3. **Blok Informasi Utama**:
     - Judul: *"Ruang Seminar B"*
     - Lokasi: Gedung C Lantai 2, Kampus Utama
     - Badge Kapasitas: *"Maksimal 60 Kursi"*
     - Badge Ketersediaan: *"Tersedia pada 20 September 2026"* (Warna abu berbingkai hijau)
  4. **Daftar Fasilitas Ruang**:
     - Checklist 1: AC Sentral (2 Unit)
     - Checklist 2: Proyektor LCD + Layar Gantung
     - Checklist 3: Sound System & 2 Wireless Mic
     - Checklist 4: Stop Kontak di Setiap Meja
  5. **Aturan Penggunaan Singkat**: Informasi tata tertib (pengajuan minimal H-3, dilarang membawa makanan berkuah).
  6. **Sticky Bottom CTA Container**:
     - Tombol Solid Lebar Penuh: `"Ajukan Peminjaman"` (Membuka layar `M03`).

### M03 — Formulir Pengajuan Peminjaman (390 × 844 px)
- **Tujuan**: Formulir online ringkas untuk menginput data acara dan penanggung jawab peminjaman.
- **Tata Letak & Komponen**:
  1. **Top Bar**: Tombol kembali `<-`, Judul *"Formulir Peminjaman"*.
  2. **Card Ringkasan Ruang Terpilih**: Menampilkan miniatur *Ruang Seminar B (Kapasitas 60)* agar pemohon yakin dengan ruang yang dipilih.
  3. **Field Form Isian**:
     - Field 1: *Nama Acara / Kegiatan* (Text input: *"Rapat Koordinasi LDKM BEM"*).
     - Field 2: *Tanggal Pemakaian* (Pre-filled dari pencarian: `20/09/2026`).
     - Field 3: *Waktu Mulai & Selesai* (Dua kolom jam: `09:00` s.d. `12:00 WIB`).
     - Field 4: *Jumlah Estimasi Peserta* (Number input: `50 orang`).
     - Field 5: *Nama Penanggung Jawab (PIC)* (Text input: `Rani Pratista`).
     - Field 6: *Nomor WhatsApp Aktif* (Phone input: `081234567890`).
     - Field 7: *Deskripsi Keperluan Singkat* (Textarea 3 baris).
  4. **Checkbox Persetujuan Ketentuan**: Checklist *"Saya menyetujui syarat & tata tertib peminjaman ruang sarpras"*.
  5. **Tombol Submit**: `"Kirim Pengajuan"` (Tinggi 48 px).

### M04 — Status Pengajuan & Bukti Tiket (390 × 844 px)
- **Tujuan**: Menampilkan konfirmasi penerimaan berkas, nomor pengajuan unik, dan pemantauan status proses verifikasi.
- **Tata Letak & Komponen**:
  1. **Top Bar**: Judul *"Status Pengajuan"*, tombol silang tutup/kembali.
  2. **Card Tiket Peminjaman Utama**:
     - Header Tiket: Nomor Tiket `#SPJ-202609-001` (dengan barcode/QR dummy).
     - Tanggal Diajukan: 16 September 2026, 08:30 WIB.
     - Ruang: Ruang Seminar B.
     - Jadwal: Minggu, 20 September 2026 (09.00 - 12.00 WIB).
  3. **Komponen Visual: Timeline Status (Vertical Stepper)**:
     - *Langkah 1*: Pengajuan Terkirim (Ikon centang hijau / selesai).
     - *Langkah 2*: Verifikasi Petugas Sarpras (Ikon jam pasir / state aktif berputar: *"Sedang Ditinjau oleh Pak Yusuf"*).
     - *Langkah 3*: Persetujuan Akhir & Pengambilan Izin (Ikon lingkaran abu-abu / pending).
  4. **Pesan Panduan**: *"Pengajuan Anda sedang diproses oleh petugas sarana. Estimasi verifikasi maksimal 1x24 jam kerja."*
  5. **Tombol Navigasi Bawah**:
     - Tombol Sekunder: `"Kembali ke Beranda"`
     - Tombol Teks: `"Unduh Bukti Pengajuan (PDF)"`

---

## 4. State Khusus Wireframe Mobile

### 1. State `M03-ERROR` (Validasi Formulir Gagal)
- **Pemicu**: Pengguna menekan tombol "Kirim Pengajuan" tanpa mengisi field wajib (contoh: Jam Belum Diisi atau Nama PIC Kosong).
- **Perubahan Visual**:
  - Border input yang kosong berubah menjadi merah tebal (`#DC2626`).
  - Muncul teks peringatan merah di bawah input: *"Field ini wajib diisi"*.
  - Muncul banner peringatan kuning-merah di bagian atas form: *"Mohon lengkapi seluruh kolom bertanda bintang sebelum mengirimkan pengajuan."*
  - Halaman otomatis melakukan *smooth scroll* ke field error pertama.

### 2. State `M04-APPROVED` (Pengajuan Disetujui)
- **Pemicu**: Petugas Sarpras (Pak Yusuf) telah menyetujui tiket peminjaman.
- **Perubahan Visual**:
  - Badge Status di tiket berubah menjadi hijau terang: `Disetujui`.
  - Langkah 2 dan 3 pada vertical timeline berubah menjadi centang hijau tebal.
  - Muncul kotak informasi instruksi pengambilan kunci: *"Peminjaman disetujui. Silakan tunjukkan nomor tiket ini ke loket Sarpras Gedung Pusat pada hari H untuk pengambilan kunci & remote AC."*

### 3. State `M04-REJECTED` (Pengajuan Ditolak)
- **Pemicu**: Petugas Sarpras menolak tiket karena jadwal bentrok atau acara tidak memenuhi syarat.
- **Perubahan Visual**:
  - Badge Status di tiket berubah menjadi merah tua: `Ditolak`.
  - Kotak Catatan Petugas (Border merah, background abu-merah):
    - Judul: *"Alasan Penolakan dari Petugas:"*
    - Isi Catatan: *"Jadwal bertabrakan dengan persiapan Wisuda Universitas. Silakan pilih ruang lain atau tanggal di luar minggu wisuda."*
  - Tombol aksi di bawah berubah menjadi tombol utama: `"Cari Ruang Lain"` yang langsung mengarahkan pengguna kembali ke `M01`.
