# 02 - Dokumentasi Migration & Model Eloquent

- Migration `rooms`: Mendefinisikan tabel master data ruang fisik dengan atribut nama, kapasitas, gedung/lokasi, fasilitas, dan status ketersediaan.
- Migration `bookings`: Mengimplementasikan foreign key constraint `room_id` yang terhubung ke `rooms.id` serta merekam detail jadwal kegiatan.
- Model `Room`: Menyediakan proteksi mass-assignment `$fillable` dan metode relasi `bookings()`.
- Model `Booking`: Menyediakan relasi balik `room()` melalui `belongsTo`.
