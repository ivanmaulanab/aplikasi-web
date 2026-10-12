Buat desain UI/UX untuk aplikasi bernama "SIPINJAM — Sistem Peminjaman Ruang dan Peralatan Kampus".

Desain ini dibuat untuk tugas Praktik Aplikasi Web Pertemuan 3 dengan fokus:
- Information Architecture
- User Flow
- Responsive Wireframe
- Prototype
- Usability Walkthrough

Gunakan hasil analisis Pertemuan 2 sebagai dasar utama. Jangan menambahkan fitur yang tidak diperlukan.

USER UTAMA:
1. Mahasiswa/Panitia kegiatan
   - Mencari ruang berdasarkan tanggal dan kapasitas.
   - Melihat detail ruang.
   - Mengajukan peminjaman ruang.
   - Melihat status pengajuan.
2. Petugas Sarana & Prasarana
   - Melihat daftar pengajuan.
   - Melihat detail pengajuan.
   - Menyetujui pengajuan.
   - Menolak pengajuan dengan alasan.

USER STORY YANG MENJADI SCOPE:
- US-01: Mahasiswa melihat ruang tersedia berdasarkan tanggal dan kapasitas.
- US-02: Mahasiswa mengajukan peminjaman ruang secara online.
- US-03: Mahasiswa menerima/melihat status pengajuan.
- US-07: Petugas memverifikasi pengajuan.
- US-09: Petugas menolak pengajuan dengan alasan.

OUT OF SCOPE:
- Peminjaman peralatan.
- Kalender seluruh ruang.
- Pengelolaan data ruang/peralatan.
- Sistem SSO.
- Notifikasi email nyata.
- Fitur favorit.

==================================================
DESIGN SYSTEM
==================================================

Buat tampilan yang modern, sederhana, profesional, dan cocok untuk aplikasi kampus.

Gunakan gaya:
- Clean
- Minimalis
- Modern
- Mudah digunakan mahasiswa
- Tidak terlalu banyak dekorasi
- Fokus pada informasi ruang dan status pengajuan

Gunakan satu sistem desain yang konsisten pada seluruh halaman.

Warna:
- Primary: #2563EB
- Primary Dark: #1E40AF
- Background: #F8FAFC
- Card: #FFFFFF
- Text utama: #0F172A
- Text sekunder: #64748B
- Border: #E2E8F0
- Success: #16A34A
- Warning: #F59E0B
- Error: #DC2626

Gunakan font modern seperti Inter atau Poppins.

Gunakan:
- Border radius sekitar 8–12 px.
- Button dengan label yang jelas.
- Card sederhana.
- Icon yang sederhana dan konsisten.
- Spacing yang rapi.
- Kontras teks yang mudah dibaca.

Jangan menggunakan desain yang terlalu ramai atau terlalu banyak gradient.

==================================================
MOBILE WIREFRAME
390 × 844 px
==================================================

Buat 4 halaman utama mobile.

M01 — BERANDA / CARI RUANG

Header:
- Logo/text "SIPINJAM"
- Profile icon

Judul:
"Cari Ruang"

Form pencarian:
- Tanggal
- Kapasitas
- Tombol "Cari Ruang"

Di bawahnya tampilkan:
"Ruang yang tersedia"

Buat contoh room card:
- Ruang Seminar A
- Kapasitas 60 orang
- Gedung Fakultas Teknik
- Status "Tersedia"
- Tombol "Lihat Detail"

Tambahkan bottom navigation:
- Beranda
- Pengajuan
- Profil

Fokus utama halaman adalah pencarian ruang.

--------------------------------------------------

M02 — DETAIL RUANG

Header:
- Tombol kembali
- Judul "Detail Ruang"

Tampilkan:
- Foto/placeholder ruang
- Nama ruang
- Kapasitas
- Lokasi
- Fasilitas
- Status ketersediaan

Contoh:
Ruang Seminar A
Kapasitas: 60 orang
Lokasi: Gedung Fakultas Teknik

Fasilitas:
- Proyektor
- Kursi
- Meja
- AC

Status:
"Tersedia"

Tambahkan tombol utama:
"Ajukan Peminjaman"

--------------------------------------------------

M03 — FORM PENGAJUAN

Header:
- Tombol kembali
- Judul "Form Pengajuan"

Field:
- Ruang
- Tanggal
- Waktu
- Tujuan/Kegiatan
- Penanggung Jawab

Tambahkan tombol:
"Ajukan Peminjaman"

Buat juga state error M03-ERROR.

Jika form belum lengkap, tampilkan:
"Field ini wajib diisi"

Gunakan warna error secara konsisten dan jangan membuat tampilan terlalu ramai.

--------------------------------------------------

M04 — STATUS PENGAJUAN

Header:
- Tombol kembali
- Judul "Status Pengajuan"

Tampilkan:
- Nomor pengajuan
- Nama ruang
- Tanggal
- Waktu
- Status

Gunakan status timeline:

Pengajuan dibuat
↓
Menunggu Verifikasi
↓
Disetujui

Buat tiga state:
1. Menunggu Verifikasi
2. Disetujui
3. Ditolak

Untuk state Ditolak tampilkan:
"Alasan penolakan"

Contoh:
"Jadwal ruang bertabrakan dengan penggunaan lain."

==================================================
DESKTOP WIREFRAME
1440 × 900 px
==================================================

Buat dashboard untuk Petugas Sarana & Prasarana.

Gunakan layout:
Sidebar kiri + content area.

Sidebar:
- SIPINJAM
- Dashboard
- Pengajuan
- Ruang
- Logout

Gunakan sidebar yang konsisten pada semua halaman desktop.

--------------------------------------------------

D01 — DASHBOARD PETUGAS

Judul:
"Dashboard"

Buat summary cards:
- Pengajuan Masuk
- Menunggu Verifikasi
- Disetujui
- Ditolak

Buat bagian:
"Pengajuan Terbaru"

Tampilkan beberapa data pengajuan dalam tabel/card.

Contoh:
SIP-001 | Rani | Ruang Seminar A | Menunggu
SIP-002 | Budi | Ruang Lab 1 | Disetujui

--------------------------------------------------

D02 — DAFTAR PENGAJUAN

Judul:
"Daftar Pengajuan"

Tambahkan:
- Search
- Filter status
- Tabel pengajuan

Kolom:
- ID Pengajuan
- Pemohon
- Ruang
- Tanggal
- Status
- Aksi

Gunakan badge status:
- Menunggu
- Disetujui
- Ditolak

Pada kolom aksi gunakan:
"Lihat Detail"

--------------------------------------------------

D03 — DETAIL PENGAJUAN

Judul:
"Detail Pengajuan"

Tampilkan informasi:

No. Pengajuan
SIP-001

Pemohon
Rani

Ruang
Ruang Seminar A

Tanggal
20 September 2026

Waktu
08.00–12.00

Kapasitas
60 orang

Tujuan
Pelaksanaan kegiatan mahasiswa

Status
Menunggu Verifikasi

Tambahkan tombol:
- "Tolak"
- "Setujui"

Buat juga state D03-ALERT jika terjadi konflik jadwal.

Tampilkan warning:
"Perhatian: terdapat kemungkinan konflik jadwal pada waktu yang dipilih."

--------------------------------------------------

D04 — TOLAK PENGAJUAN

Buat modal/dialog.

Judul:
"Tolak Pengajuan"

Tampilkan:
- Nomor pengajuan
- Pemohon
- Ruang

Textarea:
"Alasan Penolakan"

Placeholder:
"Masukkan alasan penolakan..."

Button:
"Batal"
"Tolak Pengajuan"

Setelah berhasil ditolak, tampilkan state:
"Pengajuan Ditolak"

dan alasan penolakan.

==================================================
PROTOTYPE
==================================================

Buat prototype yang dapat diklik.

MOBILE HAPPY PATH:

M01
→ klik "Lihat Detail"
→ M02
→ klik "Ajukan Peminjaman"
→ M03
→ isi form
→ klik "Ajukan Peminjaman"
→ M04
→ status "Menunggu Verifikasi"

MOBILE FAILURE PATH:

M03
→ klik "Ajukan Peminjaman" ketika form belum lengkap
→ M03-ERROR
→ tampilkan pesan "Field ini wajib diisi"
→ kembali/perbaiki form
→ M03

ADMIN HAPPY PATH:

D01
→ D02
→ pilih pengajuan
→ D03
→ klik "Setujui"
→ status menjadi "Disetujui"

ADMIN FAILURE/ALTERNATIVE PATH:

D03
→ klik "Tolak"
→ D04
→ isi alasan penolakan
→ klik "Tolak Pengajuan"
→ D03-REJECTED
→ status "Ditolak"

Pastikan:
- Semua tombol utama memiliki interaction.
- Tidak ada dead end.
- Ada tombol kembali.
- Prototype mudah dipahami ketika dipresentasikan.
- Gunakan transition sederhana seperti Smart Animate atau Instant.
- Jangan menggunakan animasi berlebihan.

==================================================
KONSISTENSI
==================================================

Pastikan seluruh halaman:
- Menggunakan warna yang sama.
- Menggunakan font yang sama.
- Menggunakan button style yang sama.
- Menggunakan card style yang sama.
- Menggunakan icon style yang sama.
- Menggunakan spacing yang konsisten.
- Menggunakan istilah yang sama dengan user story.
- Status "Menunggu Verifikasi", "Disetujui", dan "Ditolak" harus konsisten.
- Tampilan mobile dan desktop harus terasa sebagai satu aplikasi yang sama.

Tujuan akhir:
Buat desain SIPINJAM yang terlihat seperti hasil kerja mahasiswa yang rapi, realistis, sederhana, dan mudah dipresentasikan. Desain harus sesuai dengan scope Pertemuan 3 dan tidak menambahkan fitur di luar scope.