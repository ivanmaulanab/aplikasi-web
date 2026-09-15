# Panduan Implementasi Figma: Wireframe & Prototype Blueprint
**Praktik Aplikasi Web (INF60295) — Pertemuan 3**  
**Sistem Peminjaman Ruang dan Peralatan Kampus "SIPINJAM"**

---

### Informasi Tim
- **Ivan Maulana Bahtiar** (24051130047)
- **Yuki Ramadhan** (24051130053)
- **Risky Aditya Pratama** (24051130057) *(Branch: `risky-job3`)*
- **Arfa Novan Akbar** (24051130058)

---

## PEMBERITAHUAN PENTING MENGENAI INTEGRASI FIGMA

> [!IMPORTANT]
> **Status Pembuatan File Figma**: **Dikerjakan Secara Manual di Figma Web/Desktop**.  
> Di lingkungan terminal/server lokal saat ini **tidak terdapat akses token API Figma (`FIGMA_ACCESS_TOKEN`) maupun plugin integrasi otomatis Figma**, sehingga sistem **TIDAK membuat tautan (link) Figma fiktif/palsu**.
> 
> Seluruh panduan di bawah ini telah disusun dengan **presisi koordinat, ukuran frame, Auto Layout, hierarki layer, kode warna HEX, dan jalur interaksi (prototype noodles)** yang sangat lengkap agar mahasiswa (Risky) dapat menggambar dan menghubungkan prototipe di aplikasi Figma dalam waktu kurang dari 15 menit dengan rapi dan sesuai standar modul.

---

## 1. Standar Desain Sistem Wireframe (Design Tokens Low-Fidelity)

Gunakan gaya *clean grayscale* dengan aksen status minimalis:

### A. Palet Warna (HEX Codes)
| Token Nama | Nilai HEX | Peruntukan Elemen |
| :--- | :---: | :--- |
| `Canvas Background` | `#F8FAFC` | Background utama kanvas dan frame aplikasi |
| `Surface Card` | `#FFFFFF` | Background kartu kontainer, panel tabel, dan modal |
| `Border Default` | `#E2E8F0` | Garis tepi kartu, pemisah (divider), border form default |
| `Border Strong / Focus`| `#0F172A` | Border input saat aktif, border tombol outline |
| `Text Heading` | `#0F172A` | Judul layar (H1/H2), nama ruang, nomor tiket |
| `Text Body / Subtitle`| `#334155` | Paragraf penjelas, teks form, isi tabel |
| `Text Caption / Muted`| `#64748B` | Label sekunder, tanggal abu-abu, placeholder |
| `Button Primary` | `#0F172A` | Tombol aksi utama ("Cari Ruang", "Ajukan", "Setujui") |
| `Text on Primary` | `#FFFFFF` | Teks putih pada tombol primer |
| `Status Menunggu` | `#F59E0B` | Badge oranye/kuning status "Menunggu Verifikasi" |
| `Status Disetujui` | `#16A34A` | Badge hijau status "Disetujui" dan banner aman |
| `Status Ditolak / Error`| `#DC2626` | Badge merah status "Ditolak", border error, banner bentrok |

### B. Tipografi Terstandarisasi (Font: Inter / Roboto / SF Pro)
- **H1 (Header / Title Utama)**: SemiBold / Bold, 20px, Line-height 28px
- **H2 (Card Title / Subtitle)**: SemiBold, 16px, Line-height 24px
- **Body Regular (Isi Teks / Tabel)**: Regular, 14px, Line-height 20px
- **Body Medium (Label Input & Tombol)**: Medium, 14px, Line-height 20px
- **Caption / Tag Badge**: Regular / Medium, 12px, Line-height 16px

---

## 2. Blueprint Layar Mobile (Ukuran Frame: 390 × 844 px)

Pilih preset frame di Figma: **iPhone 13 / 14 (390 × 844 px)**.

### M01 — Beranda / Cari Ruang (390 × 844 px)
- **Top Bar (Y: 0, H: 56 px)**:
  - Teks kiri: `SIPINJAM` (Bold 18px, `#0F172A`)
  - Ikon kanan: Avatar lingkaran 36×36 px (`#CBD5E1`) dengan inisial "R"
- **Card Form Pencarian (X: 16, Y: 72, W: 358, H: Auto, Radius: 12 px, Fill: `#FFFFFF`, Stroke: `#E2E8F0`, Pad: 16 px)**:
  - Judul Card: `Cari Ketersediaan Ruang` (SemiBold 16px)
  - Label 1: `Tanggal Pelaksanaan` (Medium 12px, `#475569`)
  - Input 1: Kotak H: 44 px, Border `#CBD5E1`, Radius 8 px, Teks: `20/09/2026` + Ikon kalender
  - Label 2: `Jumlah Peserta (Orang)` (Medium 12px, `#475569`)
  - Input 2: Kotak H: 44 px, Border `#CBD5E1`, Radius 8 px, Teks: `50 orang`
  - Tombol CTA: Kotak H: 48 px, Fill `#0F172A`, Radius 8 px, Teks: `Cari Ruang` (Medium 14px, White, Centered)
- **Section Rekomendasi (X: 16, Y: 320, W: 358 px)**:
  - Subtitle: `Rekomendasi Ruang Kampus` (SemiBold 14px, `#64748B`)
  - **Card Ruang Seminar B (W: 358, H: 96, Radius: 10, Stroke: `#E2E8F0`, Pad: 12 px)**:
    - Nama: `Ruang Seminar B` (Bold 15px) | Lokasi: `Gedung C Lantai 2` (12px, `#64748B`)
    - Badge: `Kapasitas: Maks 60 Kursi` | Badge Hijau: `Tersedia`
  - **Card Aula Gedung A (W: 358, H: 96, Radius: 10, Stroke: `#E2E8F0`, Pad: 12 px)**:
    - Nama: `Aula Utama Gedung A` (Bold 15px) | Lokasi: `Gedung A` (12px)
    - Badge: `Kapasitas: Maks 150 Kursi` | Badge Hijau: `Tersedia`
- **Bottom Navigation Bar (Fixed Bottom, Y: 780, H: 64 px, Stroke Top: `#E2E8F0`, Fill: `#FFFFFF`)**:
  - 3 Tab Navigasi: `Beranda` (Teks tebal & ikon aktif `#0F172A`), `Cari Ruang`, `Tiket Status`

---

### M02 — Detail Ruang (390 × 844 px)
- **Top Navigation Bar (H: 56 px)**:
  - Tombol kiri: Ikon panah `<-` (Tap target 44×44 px) + Teks `Detail Ruang` (SemiBold 16px)
- **Placeholder Foto Ruang (X: 16, Y: 72, W: 358, H: 180 px, Radius: 12 px, Fill: `#E2E8F0`)**:
  - Kotak abu-abu bergaris silang tipis dengan teks tengah: `[ Foto Ruang Seminar B ]`
- **Blok Spesifikasi (X: 16, Y: 268, W: 358 px, Auto Layout Vertical, Gap: 10 px)**:
  - Nama Ruang: `Ruang Seminar B` (Bold 20px)
  - Lokasi: `Gedung C Lantai 2, Kampus Utama` (13px, `#64748B`)
  - Badge Row: Tag `Maks 60 Kursi` + Tag Hijau `Tersedia pada 20 September 2026`
  - Divider garis 1px `#E2E8F0`
  - Sub-judul: `Fasilitas yang Tersedia` (SemiBold 14px)
  - Checklist Fasilitas:
    - `[v] 2 Unit AC Sentral Dingin`
    - `[v] 1 Unit Proyektor LCD + Layar Gantung`
    - `[v] Sound System & 2 Wireless Mic`
    - `[v] Stop Kontak Listrik di Setiap Meja`
- **Sticky Bottom Container (Y: 764, H: 80 px, Pad: 16 px, Stroke Top: `#E2E8F0`, Fill: `#FFFFFF`)**:
  - Tombol CTA Utama: H: 48 px, Fill `#0F172A`, Radius 8 px, Teks: `Ajukan Peminjaman` (White 14px)

---

### M03 — Formulir Pengajuan Peminjaman (390 × 844 px)
- **Top Bar (H: 56 px)**: Tombol `<-` + Teks `Formulir Peminjaman`
- **Banner Ringkasan Ruang (X: 16, Y: 68, W: 358, H: 44 px, Fill: `#F1F5F9`, Radius: 8 px, Pad: 12 px)**:
  - Teks: `Peminjaman untuk: Ruang Seminar B (Kapasitas 60)`
- **Kontainer Form (X: 16, Y: 124, W: 358 px, Auto Layout Vertical, Gap: 10 px)**:
  - Field 1: Label `Nama Acara / Kegiatan*` &rarr; Input box H: 42 px (`Rapat Koordinasi LDKM BEM`)
  - Field 2: Label `Tanggal Pelaksanaan*` &rarr; Input box H: 42 px (`20/09/2026` - Pre-filled)
  - Field 3: Baris 2 Kolom `Waktu Mulai` (`09:00 WIB`) & `Waktu Selesai` (`12:00 WIB`)
  - Field 4: Label `Jumlah Estimasi Peserta*` &rarr; Input box H: 42 px (`50 orang`)
  - Field 5: Label `Nama Penanggung Jawab (PIC)*` &rarr; Input box H: 42 px (`Rani Pratista`)
  - Field 6: Label `Nomor WhatsApp PIC*` &rarr; Input box H: 42 px (`0812-3456-7890`)
  - Field 7: Label `Keperluan Acara Singkat` &rarr; Textarea H: 64 px (`Koordinasi panitia inti LDKM...`)
  - Checkbox: `[x] Saya menyetujui syarat & tata tertib sarana kampus.`
- **Tombol Submit (X: 16, Y: 764, W: 358, H: 48 px)**: Fill `#0F172A`, Teks: `Kirim Pengajuan`

#### Variasi State: `M03-ERROR` (State Form Belum Lengkap)
- Duplikasi frame `M03`.
- Pada bagian atas form, tambahkan banner error merah tipis: `Harap lengkapi kolom yang wajib diisi!`
- Kolom Nama PIC dikosongkan dan ubah garis border menjadi merah tebal: `Stroke: #DC2626, Width: 2px`.
- Tambahkan teks caption merah di bawah kolom input: `*Field ini wajib diisi` (Ukuran 11px, Warna `#DC2626`).

---

### M04 — Status Pengajuan & Bukti Tiket (390 × 844 px)
- **Top Bar (H: 56 px)**: Teks `Bukti & Status Pengajuan` (Centered)
- **Tiket Digital Card (X: 16, Y: 76, W: 358, Radius: 12 px, Stroke: 1px `#CBD5E1`, Fill: `#FFFFFF`, Pad: 16 px)**:
  - Header Tiket: Teks kecil `TIKET ELEKTRONIK RESMI`
  - Nomor Tiket: `#SPJ-202609-001` (Bold 18px, `#0F172A`)
  - Badge Status: `Menunggu Verifikasi` (Background `#FEF3C7`, Teks `#92400E`, Radius 4 px)
  - Garis putus-putus (*dashed divider*)
  - Rincian Data:
    - Ruang: `Ruang Seminar B (Gedung C)`
    - Jadwal: `Minggu, 20 September 2026 (09.00 - 12.00 WIB)`
    - Pemohon: `Rani Pratista — BEM Fakultas`
- **Vertical Stepper Timeline (X: 24, Y: 290, W: 342 px, Gap: 14 px)**:
  - Step 1: Lingkaran hijau centang `[v]` &rarr; `Pengajuan Terkirim` *(16 Sep 2026, 08.30 WIB)*
  - Step 2: Lingkaran oranye `[o]` &rarr; `Sedang Ditinjau Petugas Sarpras` *(Estimasi maks 1x24 jam kerja)*
  - Step 3: Lingkaran abu-abu `[ ]` &rarr; `Persetujuan & Pengambilan Izin` *(Menunggu proses)*
- **Tombol Aksi Bawah (X: 16, Y: 720, W: 358 px, Gap: 8 px)**:
  - Tombol Utama: Outlined button H: 44 px, Stroke `#0F172A`, Teks: `Kembali ke Beranda`
  - Tombol Teks: H: 40 px, Teks: `Unduh Bukti Tiket (PDF)`

#### Variasi State: `M04-APPROVED` (Pengajuan Disetujui)
- Ganti badge status menjadi hijau: `Disetujui` (`#16A34A`).
- Step 2 dan 3 pada timeline berubah menjadi centang hijau `[v]`.
- Munculkan kotak hijau: *"Peminjaman disetujui. Tunjukkan tiket ini ke loket sarpras untuk pengambilan kunci."*

#### Variasi State: `M04-REJECTED` (Pengajuan Ditolak)
- Ganti badge status menjadi merah: `Ditolak` (`#DC2626`).
- Tambahkan kotak merah di bawah tiket:
  - Judul: `Catatan Alasan Penolakan Petugas:`
  - Isi: *"Jadwal bentrok dengan agenda universitas. Silakan ajukan jadwal di hari lain."*
- Ubah tombol aksi menjadi: `Cari Ruang Lain` (Mengarahkan kembali ke `M01`).

---

## 3. Blueprint Layar Desktop (Ukuran Frame: 1440 × 900 px)

Pilih preset frame di Figma: **Desktop (1440 × 900 px)**.
- **Sidebar Kiri**: W: 240 px, H: 900 px, Fill: `#0F172A` (Dark Slate)
- **Top Header**: X: 240, Y: 0, W: 1200 px, H: 64 px, Fill: `#FFFFFF`, Stroke Bottom: `#E2E8F0`
- **Area Kerja Utama**: X: 240, Y: 64, W: 1200 px, H: 836 px, Fill: `#F8FAFC`, Padding: 32 px

### D01 — Dashboard Petugas Sarpras (1440 × 900 px)
- **Sidebar Navigasi**: Logo `SIPINJAM SARPRAS`, Menu `[o] Dashboard` (Active), `[=] Daftar Pengajuan`, `[x] Jadwal Ruang`, `[<-] Logout`.
- **Top Bar**: Salam `Selamat Datang, Pak Yusuf (Petugas Sarpras)` di kiri, profil avatar di kanan.
- **Baris 4 Kartu Metrik Ringkasan (W: 1136, H: 100 px, Gap: 20 px)**:
  - Kartu 1: Label `Total Pengajuan` &rarr; Angka `42`
  - Kartu 2: Label `Menunggu Verifikasi` &rarr; Angka `7` (Border kiri 4px `#F59E0B`, Teks oranye)
  - Kartu 3: Label `Disetujui Bulan Ini` &rarr; Angka `31` (Border kiri 4px `#16A34A`, Teks hijau)
  - Kartu 4: Label `Ditolak` &rarr; Angka `4` (Border kiri 4px `#DC2626`, Teks merah)
- **Card Tabel Pengajuan Terbaru (W: 1136 px, Pad: 20 px, Fill: `#FFFFFF`, Radius: 8 px, Stroke: `#E2E8F0`)**:
  - Header: `Antrean Pengajuan yang Perlu Diproses Segera`
  - Tabel 5 Baris:
    - Baris 1: `#SPJ-0824` | `Rani Pratista (BEM)` | `Ruang Seminar B` | `20/09/2026 (09-12)` | Badge: `Menunggu Verifikasi` | Tombol: `Periksa` (Solid `#0F172A`)
    - Baris 2: `#SPJ-0823` | `Dimas (HIMATIF)` | `Aula Gedung A` | `22/09/2026 (13-16)` | Badge: `Disetujui` | Tombol: `Detail`

---

### D02 — Daftar Pengajuan Lengkap (1440 × 900 px)
- **Sidebar**: Menu `Daftar Pengajuan` dalam state aktif.
- **Toolbar Filter (W: 1136 px, H: 44 px, Gap: 12 px, Display: Flex)**:
  - Search Input: W: 360 px, Placeholder: `Cari nomor tiket, nama mahasiswa, atau ruang...`
  - Dropdown Filter Status: W: 180 px (`Semua Status`, `Menunggu`, `Disetujui`, `Ditolak`)
  - Date Filter: W: 200 px (`Pilih Tanggal Acara`)
- **Tabel Data Lengkap (W: 1136 px, Fill: `#FFFFFF`, Radius: 8 px, Stroke: `#E2E8F0`)**:
  - Table Header: `# ID Tiket | Pemohon / Ormawa | Ruang | Tanggal Acara | Sesi Jam | Kapasitas | Status | Aksi`
  - Baris Data 1: `#SPJ-0824 | Rani (BEM Fakultas) | Ruang Seminar B | 20/09/2026 | 09.00-12.00 | 50 Org | Menunggu Verifikasi | Button "Lihat Detail"`
  - Baris Data 2: `#SPJ-0822 | Ahmad (DPM) | Ruang Rapat 1 | 21/09/2026 | 10.00-13.00 | 25 Org | Ditolak | Button "Lihat Detail"`
- **Pagination**: `Menampilkan 1-10 dari 42 pengajuan | < Halaman 1 [2] [3] >`

---

### D03 — Detail & Verifikasi Pengajuan (1440 × 900 px)
- **Header**: Tombol `<- Kembali ke Daftar` | Judul: `Detail Pengajuan #SPJ-0824` | Badge: `Menunggu Verifikasi`
- **Layout 2 Kolom (Grid Gap: 24 px)**:
  - **Kolom Kiri (W: 700 px, Informasi Pemohon & Berkas)**:
    - Card Profil: Nama: `Rani Pratista (NIM: 24051130048)`, Organisasi: `BEM Fakultas`, Kontak: `0812-3456-7890`, Email: `rani@mhs.ac.id`.
    - Card Acara: Ruang: `Ruang Seminar B (Gd. C Lt. 2)`, Jadwal: `20 Sep 2026, 09.00 - 12.00 WIB`, Peserta: `50 orang`, Keperluan: `Rapat Koordinasi LDKM`.
    - Card Lampiran: File icon + `proposal_kegiatan_ldkm.pdf (1.2 MB)` &rarr; Link download.
  - **Kolom Kanan (W: 412 px, Panel Evaluasi & Keputusan)**:
    - **Card Deteksi Bentrok Sistem**:
      - *State Aman*: Box hijau `#F0FDF4`, Border `#16A34A`, Teks: `[v] Ruang Seminar B Bebas Bentrok pada slot waktu 09.00 - 12.00 WIB.`
      - *State Bentrok (`D03-ALERT`)*: Box merah `#FEF2F2`, Border `#DC2626`, Teks: `[!] PERINGATAN: Jadwal bentrok dengan acara #SPJ-0790 (10.00 - 13.00 WIB)!`
    - **Card Keputusan Verifikasi Petugas**:
      - Teks panduan: `Tentukan keputusan verifikasi pengajuan:`
      - Tombol Merah Outline: `Tolak Pengajuan` (Memicu pembukaan modal `D04`)
      - Tombol Hijau Solid: `Setujui Pengajuan` (Konfirmasi persetujuan instan)

#### Variasi State: `D03-APPROVED` (Persetujuan Selesai)
- Status badge atas berubah hijau: `Disetujui`.
- Panel tombol verifikasi dinonaktifkan dan digantikan teks: *"Disetujui oleh Pak Yusuf pada 16/09/2026 09.15 WIB. Jadwal ruang telah dikunci."*

---

### D04 — Modal Dialog Tolak Pengajuan (Overlay Dialog pada D03)
- **Backdrop Gelap**: W: 1440, H: 900 px, Fill: `#000000`, Opacity: 50%.
- **Modal Box (Centered, W: 520 px, H: Auto, Fill: `#FFFFFF`, Radius: 12 px, Pad: 24 px, Gap: 14 px)**:
  - Header: Judul `Tolak Pengajuan Peminjaman` (Bold 18px, `#DC2626`) + Tombol silang `X`
  - Sub-info: `ID Tiket: #SPJ-0824 | Pemohon: Rani (BEM Fakultas)`
  - Label: `Alasan Penolakan (Wajib Diisi)*` (Medium 13px)
  - Textarea: H: 90 px, Border `#CBD5E1`, Radius 6 px, Placeholder: `Tuliskan alasan penolakan secara spesifik agar pemohon dapat memperbaiki jadwal...`
  - Caption: `Catatan ini akan otomatis masuk ke status tiket mahasiswa.` (11px, `#64748B`)
  - Baris Tombol Aksi (Kanan Bawah):
    - Tombol Ghost Gray: `Batal` (W: 90 px, H: 40 px)
    - Tombol Solid Red: `Konfirmasi Tolak Pengajuan` (W: 180 px, H: 40 px, Fill: `#DC2626`, Text: White)

#### Variasi State: `D03-REJECTED` (Penolakan Selesai)
- Status badge atas berubah merah: `Ditolak`.
- Ditampilkan banner merah catatan: *"Alasan Penolakan: Jadwal bentrok dengan kegiatan resmi fakultas. Silakan pindah ke sesi sore atau ruang lain."*

---

## 4. Panduan Menghubungkan Interaksi Prototype (Noodles Connection)

Pindah ke tab **Prototype** di sidebar kanan Figma:

### A. Alur Mobile (Mahasiswa)
1. **Happy Path (Peminjaman Sukses)**:
   - Klik tombol `"Cari Ruang"` di frame `M01` &rarr; Sambungkan panah ke frame `M02` (*Navigate to*, Animate: Smart Animate / Ease Out 250ms).
   - Klik tombol `"Ajukan Peminjaman"` di frame `M02` &rarr; Sambungkan panah ke frame `M03` (*Navigate to*, Slide in bottom).
   - Klik tombol `"Kirim Pengajuan"` di frame `M03` &rarr; Sambungkan panah ke frame `M04` (*Navigate to*, Instant).
   - Klik tombol `"Kembali ke Beranda"` di frame `M04` &rarr; Sambungkan panah ke frame `M01` (*Navigate to*).
2. **Failure Path (Form Belum Lengkap)**:
   - Buat hotspot / varian klik pada tombol "Kirim Pengajuan" saat belum diisi &rarr; Sambungkan panah ke frame `M03-ERROR`.
   - Klik area field PIC bergaris merah di frame `M03-ERROR` &rarr; Sambungkan kembali ke frame `M03` (Simulasi perbaikan data).
3. **Tombol Kembali (Back Navigation)**:
   - Klik panah `<-` di frame `M02` &rarr; Sambungkan ke frame `M01`.
   - Klik panah `<-` di frame `M03` &rarr; Sambungkan ke frame `M02`.

### B. Alur Desktop (Petugas Sarpras)
1. **Alur Persetujuan (Happy Path)**:
   - Klik tombol `"Periksa"` pada baris `#SPJ-0824` di frame `D01` &rarr; Sambungkan panah ke frame `D03`.
   - Klik tombol `"Setujui Pengajuan"` di frame `D03` &rarr; Sambungkan panah ke frame `D03-APPROVED`.
   - Klik tombol `"<- Kembali ke Daftar"` di frame `D03-APPROVED` &rarr; Sambungkan panah ke frame `D02`.
2. **Alur Penolakan Beralasan (Failure / Conflict Path)**:
   - Klik tombol `"Tolak Pengajuan"` di frame `D03` &rarr; Sambungkan panah ke modal frame `D04` (*Open Overlay*, Centered, Close when clicking outside checked).
   - Klik tombol `"Batal"` atau ikon `X` di modal `D04` &rarr; Aksi: *Close Overlay*.
   - Klik tombol `"Konfirmasi Tolak Pengajuan"` di modal `D04` &rarr; Aksi: *Close Overlay and Swap to D03-REJECTED*.

---

## 5. Ringkasan Langkah Eksekusi Cepat di Figma (10–15 Menit)

1. Buka [figma.com](https://www.figma.com) dan buat file baru bertajuk **"SIPINJAM — Wireframe Pertemuan 3"**.
2. Buat frame berukuran **390 × 844 px** sebanyak 4 buah untuk Mobile (`M01`, `M02`, `M03`, `M04`).
3. Buat frame berukuran **1440 × 900 px** sebanyak 4 buah untuk Desktop (`D01`, `D02`, `D03`, `D04`).
4. Beri varian komponen state error (`M03-ERROR`), state disetujui (`M04-APPROVED`, `D03-APPROVED`), dan state ditolak (`M04-REJECTED`, `D03-REJECTED`).
5. Sambungkan *prototype noodles* sesuai panduan Bagian 4 di atas.
6. Klik tombol **Play (Present)** di pojok kanan atas Figma untuk menguji interaksi alur jalan happy path dan failure path.
7. Ambil tautan publik (*Share &rarr; Anyone with the link can view*) untuk dikumpulkan bersama berkas tugas ini.
