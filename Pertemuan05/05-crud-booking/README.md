# 05 - Arsitektur CRUD Pengajuan & Validasi Konflik Jadwal

1. **Validasi Kapasitas Ruang**:
   Sistem memeriksa apakah input `participants` melebihi nilai `capacity` dari entitas `Room` yang dipilih. Jika melebihi batas, form dikembalikan dengan pesan error.
2. **Validasi Anti-Bentrok Jadwal (Time Overlap Detection)**:
   Menerapkan pengecekan kondisi overlap:
   `(start_time < requested_end) AND (end_time > requested_start)` pada `room_id` dan `date` yang sama dengan status `pending` atau `approved`. Jika ditemukan irisan waktu, pengajuan otomatis ditolak.
