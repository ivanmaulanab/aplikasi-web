# 01 - Pemetaan Model Data & Relasi Basis Data SIPINJAM
Mata Kuliah: Praktik Aplikasi Web (INF60295) - Pertemuan 5

## 1. Pemetaan Entitas Antarmuka ke Kolom Database MySQL
| Entitas Antarmuka | Field Antarmuka | Kolom Tabel MySQL | Tipe Data | Keterangan & Aturan |
| :--- | :--- | :--- | :--- | :--- |
| **Ruang** | Nama Ruang | `rooms.name` | VARCHAR(100) | Wajib, identitas ruang |
| **Ruang** | Kapasitas | `rooms.capacity` | UNSIGNED INT | Kapasitas maksimum peserta |
| **Ruang** | Lokasi | `rooms.location` | VARCHAR(150) | Gedung dan lantai ruang |
| **Ruang** | Fasilitas | `rooms.facilities` | TEXT | Opsional / Nullable |
| **Ruang** | Status Ketersediaan | `rooms.is_available` | BOOLEAN | Default true (1) |
| **Pengajuan** | Ruang Terpilih | `bookings.room_id` | FOREIGN KEY | Relasi ke `rooms.id` (Cascade On Delete) |
| **Pengajuan** | Nama Kegiatan | `bookings.activity_name` | VARCHAR(150) | Wajib diisi peminjam |
| **Pengajuan** | Tanggal Peminjaman | `bookings.date` | DATE | Validasi: `after_or_equal:today` |
| **Pengajuan** | Waktu Mulai & Selesai | `bookings.start_time / end_time` | TIME | Validasi: `end_time > start_time` |
| **Pengajuan** | Jumlah Peserta | `bookings.participants` | UNSIGNED INT | Validasi: `<= rooms.capacity` |
| **Pengajuan** | Keterangan Tambahan | `bookings.notes` | TEXT | Opsional / Nullable |
| **Pengajuan** | Status Tiket | `bookings.status` | VARCHAR(50) | Default: `pending` |

## 2. Relasi Eloquent Antarentitas
- **Room (1) to Many (N) Booking:** Satu ruangan kampus dapat memiliki banyak riwayat pengajuan peminjaman (`$this->hasMany(Booking::class)`).
- **Booking (N) to One (1) Room:** Setiap pengajuan tiket hanya terikat secara spesifik pada satu entitas ruang (`$this->belongsTo(Room::class)`).
