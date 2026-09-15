# Lembar Kerja 7: Usability Walkthrough (Evaluasi Skenario Prototipe)
**Praktik Aplikasi Web (INF60295) — Pertemuan 3**  
**Sistem Peminjaman Ruang dan Peralatan Kampus "SIPINJAM"**

---

### Informasi Tim
- **Ivan Maulana Bahtiar** (24051130047)
- **Yuki Ramadhan** (24051130053)
- **Risky Aditya Pratama** (24051130057)
- **Arfa Novan Akbar** (24051130058)

> [!IMPORTANT]
> **Catatan Keterbukaan Metodologi**:  
> Evaluasi ini dilakukan menggunakan metode **Cognitive Walkthrough berbasis Skenario Prototipe** yang disimulasikan secara internal oleh tim pengembang terhadap desain wireframe dan prototipe SIPINJAM. Dokumen ini **tidak mengklaim** telah melakukan pengujian laboratorium formal dengan pengguna manusia eksternal (*actual user testing*), melainkan mensimulasikan langkah demi langkah tugas pengguna berdasarkan persona Rani guna menemukan potensi kendala usabilitas sedini mungkin sebelum tahap koding implementasi.

---

## 1. Skenario Pengujian yang Digunakan

> *"Anda adalah Rani, Ketua Panitia Pelaksana LDKM BEM Fakultas. Anda ditugaskan mencari ruang kegiatan yang mampu menampung minimal 50 peserta pada tanggal 20 September 2026. Gunakan smartphone Anda untuk mencari ruang yang sesuai, periksa fasilitas yang tersedia di ruang tersebut, ajukan peminjaman secara online hingga tuntas, lalu pastikan bukti dan status pengajuan dapat ditemukan kembali untuk dilaporkan kepada panitia inti."*

---

## 2. Tabel Temuan Usabilitas (Cognitive Walkthrough Findings)

Evaluasi dikelompokkan ke dalam tiga tingkat keparahan:
- **Kritis**: Hambatan fatal yang menghentikan alur tugas (*task blocker*) atau berisiko kehilangan data pengguna.
- **Mayor**: Kendala signifikan yang menyebabkan kebingungan tinggi, keraguan lama, atau inefisiensi alur kerja.
- **Minor**: Masalah kenyamanan visual, ketidakjelasan label mikro (*microcopy*), atau estetika antarmuka.

| No | Lokasi Layar / Komponen | Deskripsi Temuan Masalah | Kategori Tingkat Keparahan | Dampak terhadap Pengguna |
| :---: | :--- | :--- | :---: | :--- |
| **1** | `M01` (Widget Pencarian Beranda) | Input kapasitas hanya bertuliskan placeholder angka `"50"`, tanpa keterangan satuan yang jelas apakah orang atau kursi meja. Tombol "Cari Ruang" awalnya terletak di bawah lipatan layar (*below the fold*) pada layar ponsel berdimensi kecil. | **Mayor** | Pengguna sempat ragu apakah harus mengetik "50" atau "50 orang", dan harus melakukan *scrolling* ekstra untuk menemukan tombol pemicu pencarian. |
| **2** | `M03` (Formulir Pengajuan) | Setelah menekan tombol "Kirim Pengajuan", layar awalnya langsung beralih ke halaman kosong sebelum status muncul, tanpa adanya dialog konfirmasi ringkasan data atau indikator pemrosesan (*loading state*). | **Kritis** | Pengguna merasa cemas dan ragu apakah data formulir telah berhasil tersimpan di server kampus atau terjadi *crash* di tengah jalan. |
| **3** | `M03-ERROR` (Validasi Formulir) | Pesan kesalahan validasi awalnya hanya menampilkan garis merah tipis pada form tanpa teks penjelasan spesifik alasan error di bawah kolom input bersangkutan. | **Mayor** | Pengguna kebingungan mencari kolom mana yang keliru dan apa syarat pengisian yang belum terpenuhi. |
| **4** | `M04` (Status Pengajuan Tiket) | Label status awal bertuliskan *"Menunggu Verifikasi"* dengan teks abu-abu statis tanpa estimasi durasi waktu pemrosesan oleh pihak Sarpras. | **Minor** | Mahasiswa tidak mengetahui kapan harus mengecek kembali atau apakah mereka perlu mendatangi kantor sarana secara fisik. |
| **5** | `M02` & `M03` (Navigasi Atas) | Ikon panah kembali (`<-`) di pojok kiri atas memiliki area sentuh (*tap target*) yang terlalu kecil ($\le 24$ px) dan berdekatan dengan tepi atas layar. | **Minor** | Pengguna dengan jempol besar kesulitan menekan tombol kembali saat ingin mengganti ruang yang dipilih. |

---

## 3. Rincian Revisi Desain yang Diterapkan

Berdasarkan temuan di atas, tim melakukan 3 revisi desain konkret yang langsung diintegrasikan ke dalam spesifikasi wireframe dan prototipe akhir:

### Revisi 1: Perbaikan Widget Pencarian & Ergonomi Tombol (Menjawab Temuan 1)
- **Tindakan**:
  1. Menambahkan label satuan eksplisit `"Jumlah Peserta (Orang)"` pada kolom input kapasitas.
  2. Memadatkan padding vertikal widget pencarian pada `M01` sehingga seluruh form filter dan tombol CTA utama `"Cari Ruang"` tampil utuh pada pandangan pertama layar (*above the fold*) pada resolusi 390 × 844 px.
  3. Memperbesar ukuran tinggi tombol menjadi 48 px dengan kontras warna maksimal (`#0F172A` di atas `#FFFFFF`).

### Revisi 2: Penambahan Umpan Balik Instan & Konfirmasi Tiket Jelas (Menjawab Temuan 2 & 4)
- **Tindakan**:
  1. Pada halaman `M04`, struktur bukti pengajuan diubah menyerupai kartu tiket resmi (*Boarding Pass Style Card*) dengan nomor pengajuan tebal `#SPJ-202609-001`.
  2. Mengimplementasikan komponen **Vertical Stepper Timeline**:
     - Tahap 1: Pengajuan Diterima (Centang Hijau)
     - Tahap 2: Verifikasi Petugas (Ikon Proses + Catatan: *"Estimasi maksimal 1x24 jam kerja"*)
     - Tahap 3: Keputusan Akhir
  3. Memberikan tombol pintasan yang jelas: `"Kembali ke Beranda"` dan tab tetap *"Tiket Saya"* di bottom navigation bar agar mahasiswa dapat membuka kembali bukti pengajuan kapan saja dengan satu ketukan.

### Revisi 3: Standardisasi Validasi Inline & Perluasan Tap Target (Menjawab Temuan 3 & 5)
- **Tindakan**:
  1. Mengubah mekanisme validasi error pada `M03-ERROR`: border input menebal menjadi 2px merah (`#DC2626`), disertai teks caption penjelas yang eksplisit di bawah input: *"Field ini wajib diisi"* atau *"Format jam tidak valid"*.
  2. Menstandarkan seluruh tombol navigasi kembali dan ikon interaktif dengan area sentuh minimal **44 × 44 px** (*WCAG 2.1 Touch Target Spacing Compliance*), memudahkan navigasi satu tangan (*one-handed operation*) bagi Rani.
