# Matriks Ketertelusuran Kebutuhan (Traceability Matrix)
**Praktik Aplikasi Web (INF60295) — Pertemuan 3**  
**Sistem Peminjaman Ruang dan Peralatan Kampus "SIPINJAM"**

---

### Informasi Tim
- **Ivan Maulana Bahtiar** (24051130047)
- **Yuki Ramadhan** (24051130053)
- **Risky Aditya Pratama** (24051130057)
- **Arfa Novan Akbar** (24051130058)

---

## 1. Ikhtisar Matriks Keterlacakan

Matriks ketertelusuran (*Requirement Traceability Matrix*) memastikan bahwa setiap kebutuhan yang disepakati pada **Product Backlog & User Story Pertemuan 2** terefleksikan secara akurat ke dalam **Acceptance Criteria**, rancangan **Layar Wireframe**, variasi **State Antarmuka**, serta alur interaksi **Prototipe** pada Pertemuan 3 tanpa ada celah (*gap*) maupun fitur yang terabaikan.

---

## 2. Tabel Traceability Matrix Komprehensif

| User Story ID | Deskripsi User Story | Acceptance Criteria ID | Rincian Acceptance Criteria | Layar Terkait | State Antarmuka | Alur Prototipe & Pemicu Interaksi |
| :---: | :--- | :---: | :--- | :---: | :---: | :--- |
| **US-01** | Mahasiswa melihat ruang tersedia berdasarkan tanggal dan kapasitas | **AC-01** | Given mahasiswa memilih tanggal, When pencarian dilakukan, Then sistem menampilkan ruang yang tersedia pada tanggal tersebut. | `M01`, `M01-R` | Default State | Klik tombol `"Cari Ruang"` pada `M01` → Membuka daftar ruang pada `M01-R`. |
| **US-01** | Mahasiswa melihat ruang tersedia berdasarkan tanggal dan kapasitas | **AC-02** | Given kapasitas diisi 50 orang, When hasil ditampilkan, Then hanya ruang berkapasitas minimal 50 yang muncul. | `M01`, `M01-R`, `M02` | Filtered State | Input angka 50 pada `M01` → Hanya menampilkan Ruang Seminar B (Kapasitas 60) dan Aula Utama (Kapasitas 150). |
| **US-01** | Mahasiswa melihat ruang tersedia berdasarkan tanggal dan kapasitas | **AC-03** | Given tidak ada ruang tersedia, When pencarian selesai, Then sistem menampilkan pesan yang jelas dan saran mengganti kriteria. | `M01-R` | Empty State (*Failure Path*) | Pencarian menghasilkan 0 ruang → Menampilkan alert box *"Ruang tidak tersedia untuk kriteria tersebut"* dan tombol ubah filter. |
| **US-02** | Mahasiswa mengajukan peminjaman ruang secara online | **AC-04** | Given mahasiswa telah memilih ruang dan tanggal, When mahasiswa mengisi formulir pengajuan lengkap, Then sistem menyimpan pengajuan dengan status "Menunggu Verifikasi". | `M02`, `M03`, `M04` | Success State (*Happy Path*) | Klik `"Ajukan Peminjaman"` pada `M02` → Mengisi form pada `M03` → Klik `"Kirim Pengajuan"` → Menyimpan tiket status ke `M04`. |
| **US-02** | Mahasiswa mengajukan peminjaman ruang secara online | **AC-05** | Given formulir pengajuan belum lengkap, When mahasiswa menekan tombol ajukan, Then sistem menampilkan pesan field yang wajib diisi. | `M03`, `M03-ERROR` | Error State (*Failure Path*) | Menekan `"Kirim Pengajuan"` saat kolom nama penanggung jawab kosong → Membuka `M03-ERROR` dengan garis merah dan pesan teks penjelas. |
| **US-02** | Mahasiswa mengajukan peminjaman ruang secara online | **AC-06** | Given pengajuan berhasil disimpan, When proses penyimpanan selesai, Then sistem mengirim konfirmasi kepada mahasiswa berisi nomor pengajuan. | `M04` | Pending State | Halaman `M04` menampilkan tiket resmi `#SPJ-202609-001` dengan timeline status *Menunggu Verifikasi*. |
| **US-03** | Mahasiswa menerima notifikasi status pengajuan disetujui / ditolak | - | Mahasiswa dapat memantau apakah pengajuan disetujui atau ditolak secara jelas melalui layar tiket dan tab navigasi. | `M04` | Approved / Rejected State | - `M04-APPROVED`: Badge status hijau + petunjuk ambil kunci di sarpras.<br>- `M04-REJECTED`: Badge merah + kotak teks alasan penolakan dari petugas. |
| **US-07** | Petugas sarana memverifikasi pengajuan peminjaman ruang | **AC-10** | Given terdapat pengajuan berstatus "Menunggu Verifikasi", When petugas membuka daftar pengajuan, Then sistem menampilkan detail pengajuan termasuk data pemohon dan jadwal. | `D01`, `D02`, `D03` | Default Table & Detail View | Klik tombol `"Periksa"` pada antrean `D01` atau baris `#SPJ-0824` pada tabel `D02` → Membuka halaman periksa `D03`. |
| **US-07** | Petugas sarana memverifikasi pengajuan peminjaman ruang | **AC-11** | Given pengajuan tidak memiliki bentrok jadwal, When petugas menekan tombol setujui, Then status pengajuan berubah menjadi "Disetujui" dan mahasiswa menerima notifikasi. | `D03` | Approved State (*Happy Path*) | Klik tombol `"Setujui Pengajuan"` pada `D03` → Sistem mengunci slot jadwal dan memperbarui tampilan status tiket menjadi `D03-APPROVED`. |
| **US-07** | Petugas sarana memverifikasi pengajuan peminjaman ruang | **AC-12** | Given pengajuan memiliki jadwal bentrok dengan pengajuan lain yang sudah disetujui, When petugas membuka pengajuan, Then sistem menampilkan peringatan bentrok sebelum petugas memutuskan. | `D03` | Warning Conflict State | Halaman `D03` secara otomatis memunculkan banner peringatan merah tebal ketika mendeteksi tumpang tindih waktu dengan peminjaman lain. |
| **US-09** | Petugas sarana menolak pengajuan dengan alasan tertentu | - | Given pengajuan bermasalah / bentrok, When petugas memilih tolak dan menginput alasan, Then status berubah "Ditolak" disertai alasan. | `D03`, `D04` | Rejection Modal & Rejected State (*Failure Path*) | Klik tombol `"Tolak Pengajuan"` pada `D03` → Membuka modal pop-up `D04` → Input alasan wajib → Klik `"Konfirmasi Tolak"` → Mengubah status menjadi `D03-REJECTED`. |

---

## 3. Kesimpulan Verifikasi Keterlacakan

1. **Kelengkapan Fitur Inti (100% Covered)**: Seluruh user story *Must* (`US-01`, `US-02`, `US-07`) dan *Should* (`US-03`, `US-09`) yang masuk dalam cakupan Scope Canvas Pertemuan 3 telah terpetakan secara lengkap ke dalam minimal satu layar dan satu alur prototipe.
2. **Kondisi Positif & Negatif Seimbang**: Terdapat pemetaan eksplisit untuk skenario sukses (*happy path*) maupun kondisi penanganan kesalahan (*failure & warning states*), menjamin sistem tangguh dalam menangani berbagai situasi operasional di lapangan.
