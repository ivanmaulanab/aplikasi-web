# Lembar Kerja 8: Dokumentasi Keputusan Desain (Design Decisions Log)
**Praktik Aplikasi Web (INF60295) — Pertemuan 3**  
**Sistem Peminjaman Ruang dan Peralatan Kampus "SIPINJAM"**

---

### Informasi Tim
- **Ivan Maulana Bahtiar** (24051130047)
- **Yuki Ramadhan** (24051130053)
- **Risky Aditya Pratama** (24051130057)
- **Arfa Novan Akbar** (24051130058)

---

## 1. Pendahuluan

Setiap elemen antarmuka, tata letak, dan logika interaksi pada sistem **SIPINJAM** dirancang berdasarkan data kebutuhan pengguna yang teridentifikasi pada Persona Canvas dan Product Backlog Pertemuan 2. Dokumen ini merangkum 6 keputusan desain fundamental beserta alternatif yang dipertimbangkan dan rasionalisasi pemilihannya.

---

## 2. Log Keputusan Desain

### Keputusan Desain 1: Antarmuka Mahasiswa Berbasis Mobile-First
1. **Decision**: Merancang antarmuka mahasiswa secara khusus menggunakan pendekatan *Mobile-First* (dimensi dasar 390 × 844 px).
2. **Dasar Persona / User**: Persona Rani (Ketua Panitia) yang mengakses sistem di sela-sela jam perkuliahan menggunakan ponsel pintar secara cepat di lorong gedung atau area kantin.
3. **User Story Terkait**: `US-01`, `US-02`.
4. **Alternative**: Membuat tampilan web responsif desktop standar yang sekadar mengecil (*shrink/scale down*) saat dibuka di ponsel.
5. **Alasan Dipilih**: Pendekatan mobile-first memastikan komponen input, kartu ruang, dan tombol dirancang sesuai ukuran jari jempol (*thumb-friendly* $\ge 44$ px) dengan hierarki konten ringkas tanpa elemen dekoratif yang memberatkan kuota atau memicu *horizontal scroll*.
6. **Perlu Diuji Lagi?**: Ya, perlu diuji keterbacaan formulir pengajuan saat diakses pada smartphone berlayar lebih kecil (< 375 px).

---

### Keputusan Desain 2: Informasi Kapasitas & Status Ketersediaan Eksplisit pada Kartu Ruang
1. **Decision**: Menampilkan badge kapasitas maksimal dan status ketersediaan secara langsung pada kartu ringkasan ruang (*catalog card*) sebelum pengguna masuk ke halaman detail.
2. **Dasar Persona / User**: Mahasiswa sering kali terburu-buru dan frustrasi jika harus mengeklik detail satu per satu hanya untuk memeriksa apakah ruang tersebut muat atau masih kosong.
3. **User Story Terkait**: `US-01` (`AC-01`, `AC-02`).
4. **Alternative**: Menyembunyikan status dan kapasitas di halaman utama, dan baru menampilkannya secara mendalam setelah kartu ruang diklik.
5. **Alasan Dipilih**: Menghemat *cognitive load* dan waktu pencarian mahasiswa hingga lebih dari 60%. Mahasiswa dapat langsung mengeliminasi ruang yang terlalu kecil tanpa membuka-tutup halaman berulang kali.
6. **Perlu Diuji Lagi?**: Tidak, pola ini sudah terbukti menjadi konvensi standar dalam sistem katalog pemesanan daring.

---

### Keputusan Desain 3: Alur Formulir Pengajuan Satu Kolom Vertikal (Single-Column Form)
1. **Decision**: Menggunakan susunan formulir satu kolom lurus vertikal (*single-column layout*) dengan pengelompokan logis (Kegiatan → Waktu → Penanggung Jawab).
2. **Dasar Persona / User**: Rani mengisi formulir secara mendadak sambil berjalan atau berkoordinasi; format multi-kolom di ponsel sering kali menyebabkan kolom sebelah kanan terlewat atau salah ketik.
3. **User Story Terkait**: `US-02` (`AC-04`, `AC-05`).
4. **Alternative**: Formulir bertahap (*multi-step wizard form*) 3 halaman.
5. **Alasan Dipilih**: Karena jumlah field yang diisi cukup ringkas (hanya 6 data inti), penggunaan *single-column scroll* jauh lebih cepat diselesaikan daripada *wizard* berlembar-lembar yang mengharuskan klik "Next/Lanjut" berulang kali.
6. **Perlu Diuji Lagi?**: Ya, perlu divalidasi apakah penambahan kolom lampiran proposal di masa depan membuat form terasa terlalu panjang.

---

### Keputusan Desain 4: Visualisasi Status Pengajuan Berbasis Timeline Stepper
1. **Decision**: Menggantikan label teks status sederhana dengan komponen visual *Vertical Stepper Timeline* yang mencerminkan fase proses verifikasi.
2. **Dasar Persona / User**: Rani membutuhkan kepastian tahapan berkasnya untuk menjawab pertanyaan anggota kepanitiaan lain yang menanyakan *"Sudah sampai mana izin ruang kita?"*.
3. **User Story Terkait**: `US-03` (`AC-06`).
4. **Alternative**: Teks status statis bertuliskan *"Status: Diproses"* tanpa konteks tahapan berikutnya.
5. **Alasan Dipilih**: Memberikan transparansi proses yang tinggi (*visibility of system status - Nielsen Heuristic #1*). Mahasiswa mengetahui dengan pasti bahwa berkas sudah masuk, sedang di tangan petugas Sarpras, dan tahu apa langkah selanjutnya (pengambilan kunci).
6. **Perlu Diuji Lagi?**: Tidak, feedback pada walkthrough prototipe menunjukkan kepuasan tinggi terhadap kejelasan alur ini.

---

### Keputusan Desain 5: Antarmuka Petugas Menggunakan Tabel Data Desktop dengan Fitur Filter & Search
1. **Decision**: Merancang portal kerja Petugas Sarpras secara *Desktop-First* (1440 × 900 px) dengan tabel data padat informasi (*dense data table*).
2. **Dasar Persona / User**: Pak Yusuf bekerja di kantor sarpras menggunakan komputer desktop, mengelola puluhan berkas pengajuan per minggu, dan terbiasa dengan efisiensi pandangan baris-kolom ala spreadsheet Excel.
3. **User Story Terkait**: `US-07` (`AC-10`).
4. **Alternative**: Menampilkan pengajuan dalam bentuk kartu visual grid besar (*card grid view*).
5. **Alasan Dipilih**: Bentuk kartu grid memakan ruang layar berlebih sehingga petugas harus banyak melakukan *scrolling*. Format tabel memungkinkan petugas memindai 10–15 pengajuan sekaligus dalam satu layar, lengkap dengan filter status dan tombol aksi cepat.
6. **Perlu Diuji Lagi?**: Ya, perlu diamati apakah kolom tabel sudah mencakup seluruh parameter prioritas verifikasi Pak Yusuf saat jam sibuk.

---

### Keputusan Desain 6: Penolakan Pengajuan Wajib Disertai Alasan Penolakan (Mandatory Reason Rejection)
1. **Decision**: Mengharuskan petugas mengisi kolom teks alasan penolakan pada modal dialog sebelum sistem mengizinkan status diubah menjadi "Ditolak".
2. **Dasar Persona / User**: Mencegah ketidakpastian mahasiswa yang selama ini sering ditolak tanpa tahu letak kesalahannya (apakah karena jadwal bentrok, berkas kurang, atau ruangan sedang renovasi).
3. **User Story Terkait**: `US-09`.
4. **Alternative**: Tombol tolak instan tanpa input alasan, atau hanya pilihan radio button kategori penolakan umum.
5. **Alasan Dipilih**: Menjamin komunikasi yang akuntabel dan konstruktif. Mahasiswa langsung mendapatkan arahan perbaikan (misal: disarankan pindah ke sesi siang), sehingga mengurangi kebutuhan mahasiswa menelepon atau mendatangi kantor sarpras untuk komplain.
6. **Perlu Diuji Lagi?**: Tidak, ini merupakan salah satu kriteria kesepakatan inti saat sesi peer review Pertemuan 2.
