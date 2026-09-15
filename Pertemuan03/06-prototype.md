# Lembar Kerja 8: Spesifikasi Prototipe Interaktif
**Praktik Aplikasi Web (INF60295) — Pertemuan 3**  
**Sistem Peminjaman Ruang dan Peralatan Kampus "SIPINJAM"**

---

### Informasi Tim
- **Ivan Maulana Bahtiar** (24051130047)
- **Yuki Ramadhan** (24051130053)
- **Risky Aditya Pratama** (24051130057)
- **Arfa Novan Akbar** (24051130058)

---

## 1. Ikhtisar Prototipe

Dokumen ini mendefinisikan rancangan alur interaktif (*interactive prototype blueprint*) untuk aplikasi web **SIPINJAM**. Prototipe mencakup dua skenario utama:
1. **Skenario Mahasiswa (Mobile - Rani)**: Meliputi alur normal (*happy path*) pencarian hingga penerbitan tiket status, serta penanganan kondisi gagal (*failure path*) akibat validasi formulir yang belum lengkap.
2. **Skenario Petugas Sarpras (Desktop - Pak Yusuf)**: Meliputi verifikasi persetujuan pengajuan aman (*happy path*), serta alur penanganan bentrok jadwal yang berujung pada penolakan disertai input alasan wajib (*rejection path*).

---

## 2. Matriks Transisi Layar Mobile (Mahasiswa)

### A. Alur Sukses (*Happy Path Flow: M01 → M02 → M03 → M04*)

| No | Frame Awal | Elemen Hotspot / Pemicu | Tipe Aksi | Frame Tujuan | Efek / Animasi | Keterangan & Perilaku Sistem |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| **1** | `M01` (Beranda & Filter) | Tombol `"Cari Ruang"` (atau klik Card *Ruang Seminar B*) | On Click | `M02` (Detail Ruang) | Push Left / Smart Animate (300ms) | Membuka rincian ruang yang memenuhi kriteria kapasitas 50 orang. |
| **2** | `M02` (Detail Ruang) | Tombol CTA `"Ajukan Peminjaman"` | On Click | `M03` (Formulir Peminjaman) | Slide In Bottom (250ms) | Menampilkan formulir pendaftaran dengan nama ruang terisi otomatis. |
| **3** | `M03` (Formulir Pengajuan) | Tombol CTA `"Kirim Pengajuan"` | On Click | `M04` (Status Tiket) | Instant / Dissolve | Form tervalidasi lengkap; sistem menerbitkan tiket `#SPJ-202609-001` dengan status *Menunggu Verifikasi*. |
| **4** | `M04` (Status Pengajuan) | Tombol `"Kembali ke Beranda"` | On Click | `M01` (Beranda) | Slide Right | Mengarahkan kembali ke halaman beranda dengan status terbarui pada tab tiket. |

---

### B. Alur Kondisi Gagal (*Failure Path Flow: M03 → M03-ERROR → M03*)

| No | Frame Awal | Elemen Hotspot / Pemicu | Tipe Aksi | Frame Tujuan | Efek / Animasi | Keterangan & Perilaku Sistem |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| **1** | `M03` (Formulir Pengajuan) | Tombol `"Kirim Pengajuan"` (saat kolom penanggung jawab/jam kosong) | On Click | `M03-ERROR` (Form Error) | Instant | Sistem mendeteksi *mandatory field* belum terisi; form ditolak dan memunculkan garis tepi merah serta teks peringatan. |
| **2** | `M03-ERROR` | Area Input Field Bergaris Merah | On Click / Typing | `M03` (Form Normal Terisi) | Instant | Mensimulasikan pengguna melengkapi data yang kurang; status error hilang dan siap disubmit ulang. |
| **3** | `M02` (Detail Ruang) | Tombol Panah Kembali `<-` | On Click | `M01` (Beranda) | Slide Right | Mengembalikan pengguna ke layar pencarian tanpa menyimpan draf. |
| **4** | `M03` (Formulir) | Tombol Batal / `<-` | On Click | `M02` (Detail Ruang) | Slide Down | Membatalkan pengisian form dan kembali ke detail ruang. |

---

## 3. Matriks Transisi Layar Desktop (Petugas Sarpras)

### A. Alur Persetujuan Aman (*Happy Path Flow: D01 → D02 → D03 → D03-APPROVED*)

| No | Frame Awal | Elemen Hotspot / Pemicu | Tipe Aksi | Frame Tujuan | Efek / Animasi | Keterangan & Perilaku Sistem |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| **1** | `D01` (Dashboard) | Menu `"Daftar Pengajuan"` / Tombol `"Periksa"` pada antrean | On Click | `D02` (Daftar Pengajuan) | Instant | Membuka tabel komprehensif berkas permohonan masuk. |
| **2** | `D02` (Tabel Pengajuan) | Tombol `"Lihat Detail"` pada baris tiket `#SPJ-0824` | On Click | `D03` (Detail Pengajuan) | Instant | Menampilkan rincian data pemohon, dokumen, dan hasil deteksi bentrok otomatis. |
| **3** | `D03` (Detail Pengajuan) | Tombol Hijau `"Setujui Pengajuan"` | On Click | `D03-APPROVED` | Dissolve (200ms) | Sistem mengubah status tiket menjadi *Disetujui*, mengunci jadwal pemakaian ruang, dan mengaktifkan badge hijau. |
| **4** | `D03-APPROVED` | Tombol `<- Kembali ke Daftar` | On Click | `D02` (Tabel) | Instant | Baris `#SPJ-0824` pada tabel kini berstatus *Disetujui*. |

---

### B. Alur Penolakan Beralasan (*Rejection Path Flow: D03 → D04 → D03-REJECTED*)

| No | Frame Awal | Elemen Hotspot / Pemicu | Tipe Aksi | Frame Tujuan | Efek / Animasi | Keterangan & Perilaku Sistem |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| **1** | `D03` (Detail Pengajuan) | Tombol Merah `"Tolak Pengajuan"` | On Click | `D04` (Modal Pop-up) | Open Overlay (Centered, Dim background 50%) | Membuka kotak dialog konfirmasi penolakan yang mewajibkan penginputan alasan. |
| **2** | `D04` (Modal Dialog) | Tombol `"Batal"` / Ikon Silang `X` | On Click | `D03` (Detail Pengajuan) | Close Overlay | Membatalkan aksi penolakan; data tetap dalam status *Menunggu Verifikasi*. |
| **3** | `D04` (Modal Dialog) | Tombol Solid Merah `"Konfirmasi Tolak"` | On Click | `D03-REJECTED` | Close Overlay & Swap Frame | Sistem menyimpan alasan penolakan petugas ke log audit dan menyetel status tiket menjadi *Ditolak*. |
| **4** | `D03-REJECTED` | Banner Catatan Penolakan | Static Display | - | - | Menampilkan alasan penolakan secara transparan dan menonaktifkan tombol keputusan. |

---

## 4. Rangkuman Pengujian Alur Interaksi

- **Pemberian Umpan Balik Instan**: Setiap aksi penting (klik simpan, penolakan, atau kesalahan form) selalu disertai respons visual seketika (*immediate feedback*), sehingga pengguna tidak mengalami ketidakpastian.
- **Konsistensi Navigasi Balik**: Tidak ada layar yang tidak memiliki jalan kembali (*no dead end*). Setiap layar memiliki tombol kembali yang jelas dan dapat diprediksi.
- **Pencegahan Kesalahan (*Error Prevention*)**: Pada sisi admin, tombol persetujuan hanya dapat diproses setelah hasil deteksi bentrok dinyatakan aman; jika bentrok terdeteksi, petugas secara sistematis diarahkan ke alur penolakan beralasan.
