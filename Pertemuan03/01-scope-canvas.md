# Lembar Kerja 1: Scope Canvas
**Praktik Aplikasi Web (INF60295) — Pertemuan 3**  
**Sistem Peminjaman Ruang dan Peralatan Kampus "SIPINJAM"**

---

### Informasi Tim
- **Ivan Maulana Bahtiar** (24051130047)
- **Yuki Ramadhan** (24051130053)
- **Risky Aditya Pratama** (24051130057)
- **Arfa Novan Akbar** (24051130058)

---

## 1. Identitas Proyek & Product Vision
- **Nama Produk**: SIPINJAM (Sistem Peminjaman Ruang dan Peralatan Kampus)
- **Platform**: Web Responsif (Fokus: *Mobile Web* untuk Mahasiswa, *Desktop Web* untuk Petugas Sarpras)
- **Product Vision**:  
  Untuk mahasiswa dan petugas sarana kampus yang membutuhkan proses peminjaman ruang dan peralatan yang cepat serta transparan, **SIPINJAM** adalah aplikasi web yang memungkinkan pencarian ketersediaan ruang, pengajuan daring, verifikasi pengajuan, dan pemantauan status secara terpusat. Berbeda dengan cara lama yang manual dan tersebar melalui chat/kertas, produk ini menyediakan status *real-time*, deteksi bentrok jadwal otomatis, dan riwayat peminjaman yang transparan.

---

## 2. Persona & Tujuan Pengguna

### Persona 1: Rani — Ketua Panitia Mahasiswa (Mobile User)
- **Karakteristik**: Mengakses sistem melalui smartphone di sela-sela jam kuliah; sering mengurus kegiatan organisasi mendadak di luar jam operasional kampus; terbiasa dengan antarmuka mobile yang ringkas.
- **Tujuan Utama**:
  - Mengetahui ketersediaan ruang kampus secara *real-time* berdasarkan tanggal dan kapasitas peserta.
  - Mengajukan peminjaman ruang secara online tanpa harus mendatangi ruang petugas sarpras secara fisik.
  - Memantau kejelasan status pengajuan (apakah masih menunggu verifikasi, disetujui, atau ditolak) langsung dari smartphone.

### Persona 2: Pak Yusuf — Petugas Sarana dan Prasarana (Desktop User)
- **Karakteristik**: Bekerja di depan PC kantor sarana dan prasarana pada jam operasional; menangani puluhan berkas pengajuan setiap minggu; sebelumnya merekap manual di buku dan spreadsheet.
- **Tujuan Utama**:
  - Memeriksa daftar pengajuan yang masuk secara terpusat dan terurut.
  - Mendeteksi bentrok jadwal pemakaian ruang secara otomatis sebelum memberikan persetujuan.
  - Mengambil keputusan persetujuan atau penolakan yang disertai alasan objektif agar mahasiswa dapat melakukan penyesuaian.

---

## 3. Scope Fitur Iterasi Pertemuan 3 (Core Scope)

Berdasarkan Product Backlog hasil Pertemuan 2, scope perancangan arsitektur informasi, wireframe, dan prototipe pada Pertemuan 3 difokuskan pada 5 User Story inti:

| ID Story | Peran | User Story | Prioritas | Story Point |
| :--- | :--- | :--- | :---: | :---: |
| **US-01** | Mahasiswa | Sebagai mahasiswa, saya ingin melihat ruang yang tersedia berdasarkan tanggal dan kapasitas, sehingga saya dapat memilih ruang yang sesuai tanpa bertanya ke banyak petugas. | **Must** | 5 |
| **US-02** | Mahasiswa | Sebagai mahasiswa, saya ingin mengajukan peminjaman ruang secara online, sehingga saya tidak perlu datang langsung ke ruang petugas. | **Must** | 5 |
| **US-03** | Mahasiswa | Sebagai mahasiswa, saya ingin menerima notifikasi status pengajuan, sehingga saya tahu kapan peminjaman disetujui atau ditolak. | **Should** | 3 |
| **US-07** | Petugas Sarana | Sebagai petugas sarana, saya ingin memverifikasi pengajuan peminjaman, sehingga hanya kegiatan yang valid yang mendapat ruang. | **Must** | 5 |
| **US-09** | Petugas Sarana | Sebagai petugas sarana, saya ingin menolak pengajuan dengan alasan tertentu, sehingga mahasiswa mengetahui perbaikan yang diperlukan. | **Should** | 3 |

**Total Story Points pada Scope Pertemuan 3**: 21 Story Points.

---

## 4. Acceptance Criteria yang Diuji pada Iterasi Ini

1. **Pencarian Ruang (US-01)**:
   - `AC-01`: Given mahasiswa memilih tanggal, When pencarian dilakukan, Then sistem menampilkan ruang yang tersedia pada tanggal tersebut.
   - `AC-02`: Given kapasitas diisi 50 orang, When hasil ditampilkan, Then hanya ruang berkapasitas minimal 50 yang muncul.
   - `AC-03`: Given tidak ada ruang tersedia, When pencarian selesai, Then sistem menampilkan pesan yang jelas dan saran mengganti kriteria.
2. **Pengajuan Daring (US-02)**:
   - `AC-04`: Given mahasiswa telah memilih ruang dan tanggal, When mahasiswa mengisi formulir pengajuan lengkap, Then sistem menyimpan pengajuan dengan status "Menunggu Verifikasi".
   - `AC-05`: Given formulir pengajuan belum lengkap, When mahasiswa menekan tombol ajukan, Then sistem menampilkan pesan *field* yang wajib diisi.
   - `AC-06`: Given pengajuan berhasil disimpan, When proses penyimpanan selesai, Then sistem mengirim konfirmasi kepada mahasiswa berisi nomor pengajuan.
3. **Verifikasi & Keputusan Petugas (US-07 & US-09)**:
   - `AC-10`: Given terdapat pengajuan berstatus "Menunggu Verifikasi", When petugas membuka daftar pengajuan, Then sistem menampilkan detail pengajuan termasuk data pemohon dan jadwal.
   - `AC-11`: Given pengajuan tidak memiliki bentrok jadwal, When petugas menekan tombol setujui, Then status pengajuan berubah menjadi "Disetujui" dan mahasiswa dapat melihat status terbaru.
   - `AC-12`: Given pengajuan memiliki jadwal bentrok dengan pengajuan lain yang sudah disetujui, When petugas membuka pengajuan, Then sistem menampilkan peringatan bentrok sebelum petugas memutuskan.
   - Penolakan beralasan (US-09): Given pengajuan bermasalah/bentrok, When petugas menolak pengajuan dan mengisi catatan alasan, Then status berubah menjadi "Ditolak" disertai alasan penolakan.

---

## 5. Kebutuhan Halaman & Antarmuka

### Antarmuka Pengguna Mahasiswa (Mobile First: 390 × 844 px)
1. **M01 — Beranda / Pencarian Ruang**: Header aplikasi, profil singkat, filter pencarian (tanggal & estimasi kapasitas), tombol "Cari Ruang", dan rekomendasi ruang populer.
2. **M02 — Detail Ruang**: Tampilan foto ruang, spesifikasi kapasitas, lokasi gedung, fasilitas terpasang, indikator ketersediaan, dan tombol CTA "Ajukan Peminjaman".
3. **M03 — Formulir Pengajuan**: Form input ringkas (nama kegiatan, tanggal, jam mulai-selesai, jumlah peserta, keperluan kegiatan, kontak penanggung jawab) serta pesan validasi kesalahan (*state error*).
4. **M04 — Status Pengajuan**: Halaman bukti pengajuan dengan tiket nomor pengajuan, ringkasan peminjaman, serta visualisasi timeline status (*Menunggu Verifikasi*, *Disetujui*, atau *Ditolak* beserta alasan).

### Antarmuka Petugas Sarana (Desktop First: 1440 × 900 px)
1. **D01 — Dashboard Petugas**: Sidebar navigasi, kartu metrik ringkasan (Total Pengajuan, Menunggu Verifikasi, Disetujui, Ditolak), dan daftar antrean pengajuan terbaru.
2. **D02 — Daftar Pengajuan**: Fitur pencarian, filter status, dan tabel pengajuan lengkap (ID Pengajuan, Pemohon, Ruang, Tanggal, Status, Aksi Lihat Detail).
3. **D03 — Detail & Verifikasi Pengajuan**: Panel periksa data pemohon, detail acara, deteksi peringatan bentrok jadwal (*conflict warning indicator*), serta tombol aksi "Setujui" dan "Tolak".
4. **D04 — Modal Tolak Pengajuan**: Kotak dialog penolakan dengan informasi nomor pengajuan, input textarea alasan penolakan, tombol "Batal", dan tombol konfirmasi "Tolak Pengajuan".

---

## 6. Out of Scope (Fitur untuk Iterasi Berikutnya)

Fitur-fitur berikut diidentifikasi pada Product Backlog Pertemuan 2 namun sengaja disimpan untuk iterasi pengembangan berikutnya agar lingkup desain dan pengujian prototipe tetap fokus dan tajam:
- **US-06 (Pinjam Peralatan Bersamaan dengan Ruang - 8 SP)**: Fitur penambahan inventaris alat (proyektor, sound system, mic wireless) ditunda karena memerlukan modul manajemen stok terpisah.
- **US-08 (Kalender Jadwal Interaktif Seluruh Ruang - 8 SP)**: Visualisasi kalender matriks penuh per jam ditunda ke tahap implementasi web interaktif.
- **US-04 (Pembatalan Pengajuan Mandiri oleh Mahasiswa - 2 SP)**: Tombol *cancel request* mandiri belum masuk skenario utama.
- **US-05 (Riwayat Pengajuan Lengkap & Filter Arsip - 3 SP)**: Halaman arsip masa lalu disimpan untuk iterasi berikutnya; saat ini difokuskan pada halaman status tiket aktif.
- **US-10 (Manajemen Data Master Ruang & Alat - 5 SP)**: Modul CRUD ruang dan inventaris oleh admin berada di luar ranah alur transaksi utama.

---

## 7. Asumsi yang Diuji & Batasan Prototipe

### Asumsi yang Diuji pada Prototipe
1. Mahasiswa (Rani) dapat menemukan ruang yang sesuai kapasitas dalam waktu kurang dari 60 detik melalui filter pencarian yang disediakan di ponsel.
2. Penempatan form dalam satu halaman alur lurus meminimalkan kemungkinan kesalahan input data.
3. Petugas (Pak Yusuf) langsung dapat mengidentifikasi apakah suatu jadwal bentrok atau aman melalui banner peringatan sebelum menekan tombol keputusan.
4. Input alasan penolakan yang wajib diisi memberikan kejelasan langsung kepada mahasiswa tanpa perlu menghubungi petugas secara personal via WhatsApp.

### Batasan Prototipe
- Prototipe menggunakan prinsip *Low-to-Mid Fidelity Wireframe* (fokus pada tata letak, hirarki informasi, alur interaksi, dan keterbacaan teks tanpa dekorasi visual yang rumit).
- Data peminjaman disajikan secara terisolasi untuk skenario pengujian (studi kasus Aula Gedung A kapasitas 100 orang dan Ruang Seminar B kapasitas 50 orang).
- Pengiriman notifikasi disimulasikan melalui perubahan status visual pada layar dan pergantian state (tidak terhubung ke gateway SMS/WhatsApp nyata).
