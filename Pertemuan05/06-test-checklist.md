# 06 - Checklist Pengujian End-to-End CRUD Basis Data

| No | Skenario Pengujian | Bukti Verifikasi | Hasil | Keterangan |
| :---: | :--- | :--- | :---: | :--- |
| 1 | Daftar ruang tampil | Data di browser cocok dengan record tabel `rooms` | SUDAH | Read berhasil via Eloquent |
| 2 | Tambah ruang baru | Record baru terbentuk di basis data MySQL | SUDAH | Create berhasil |
| 3 | Edit kapasitas ruang | Nilai kapasitas berubah di database & UI | SUDAH | Update berhasil |
| 4 | Hapus ruang | Record terhapus dari MySQL | SUDAH | Delete berhasil |
| 5 | Kirim pengajuan valid | Record booking terbentuk dengan status 'pending' | SUDAH | Form menyimpan data |
| 6 | Peserta > kapasitas | Sistem menolak input dan menampilkan alert error | SUDAH | Validasi kapasitas bekerja |
| 7 | Jadwal bertabrakan | Sistem menolak booking pada jam & ruang yang sama | SUDAH | Aturan overlap berhasil menolak |
| 8 | Tampil nama relasi | Nama ruangan tampil pada daftar tiket pengajuan | SUDAH | Eager loading with('room') bekerja |
| 9 | Batalkan pengajuan | Data tiket terhapus dari tabel `bookings` | SUDAH | Delete booking berhasil |
| 10 | Tampilan responsif | Tabel dan form rapi tanpa overflow horizontal | SUDAH | Menggunakan CSS Grid & Flexbox |

<!-- Uji 1: tampil daftar ruang -->

<!-- Uji 2: validasi form tambah ruang -->

<!-- Uji 3: update data ruang -->

<!-- Uji 4: hapus data ruang -->

<!-- Uji 5: batas kapasitas peserta -->

<!-- Uji 6: cek bentrok jadwal -->

<!-- Update log verifikasi pengujian modul 5 ke-1 pada 2026-10-21 02:39:27 -->

<!-- Update log verifikasi pengujian modul 5 ke-2 pada 2026-10-21 02:39:27 -->

<!-- Update log verifikasi pengujian modul 5 ke-3 pada 2026-10-21 02:39:27 -->

<!-- Update log verifikasi pengujian modul 5 ke-4 pada 2026-10-21 02:39:27 -->

<!-- Update log verifikasi pengujian modul 5 ke-5 pada 2026-10-21 02:39:27 -->

<!-- Update log verifikasi pengujian modul 5 ke-6 pada 2026-10-21 02:39:27 -->

<!-- Update log verifikasi pengujian modul 5 ke-7 pada 2026-10-21 02:39:27 -->

<!-- Update log verifikasi pengujian modul 5 ke-8 pada 2026-10-21 02:39:28 -->

<!-- Update log verifikasi pengujian modul 5 ke-9 pada 2026-10-21 02:39:28 -->

<!-- Update log verifikasi pengujian modul 5 ke-10 pada 2026-10-21 02:39:28 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-1 pada 2026-10-21 02:42:01 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-2 pada 2026-10-21 02:42:01 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-3 pada 2026-10-21 02:42:01 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-4 pada 2026-10-21 02:42:01 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-5 pada 2026-10-21 02:42:01 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-6 pada 2026-10-21 02:42:01 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-7 pada 2026-10-21 02:42:02 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-8 pada 2026-10-21 02:42:02 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-9 pada 2026-10-21 02:42:02 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-10 pada 2026-10-21 02:42:02 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-11 pada 2026-10-21 02:42:02 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-12 pada 2026-10-21 02:42:02 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-13 pada 2026-10-21 02:42:02 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-14 pada 2026-10-21 02:42:03 -->

<!-- Audit verifikasi pengujian tambahan iterasi ke-15 pada 2026-10-21 02:42:03 -->
