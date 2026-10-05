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
