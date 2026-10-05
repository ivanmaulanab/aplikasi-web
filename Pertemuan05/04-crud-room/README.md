# 04 - Arsitektur CRUD Data Ruang

- **Index**: Menampilkan kartu ruang secara dinamis langsung dari database MySQL (`Room::latest()->get()`).
- **Create & Store**: Merekam entri ruangan baru dengan validasi ketat nama, kapasitas minimal 1 orang, dan lokasi.
- **Edit & Update**: Memperbarui atribut fasilitas dan status operasional ruang.
- **Destroy**: Menghapus data ruang dari database dengan proteksi konfirmasi alert JavaScript.
