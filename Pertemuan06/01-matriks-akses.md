MATRIKS HAK AKSES DAN RANCANGAN PERAN SIPINJAM (PERTEMUAN 6)
Nama: Yuki Ramadhan
NIM: 24051130053

1. Daftar Peran Pengguna
- Tamu: Pengguna yang belum login ke dalam sistem.
- Peminjam: Pengguna terdaftar (mahasiswa/staf) yang dapat mengajukan peminjaman ruang.
- Admin: Pengelola ruang yang berwenang mengelola data master ruang dan menyetujui/menolak pengajuan.

2. Tabel Matriks Hak Akses
| Fitur | Tamu | Peminjam | Admin |
| :--- | :--- | :--- | :--- |
| Lihat daftar dan detail ruang | Boleh | Boleh | Boleh |
| Tambah, ubah, hapus ruang | Tidak | Tidak | Boleh |
| Dashboard | Tidak (ke login) | Boleh | Boleh |
| Mengajukan peminjaman | Tidak (ke login) | Boleh | Boleh |
| Melihat daftar pengajuan | Tidak | Milik sendiri | Semua |
| Ubah/hapus pengajuan | Tidak | Milik sendiri dan masih pending | Semua |
| Setujui/tolak pengajuan | Tidak | Tidak | Boleh |

3. Perubahan Struktur Basis Data
- Tabel users: Tambah kolom role (string, default: peminjam).
- Tabel bookings: Tambah kolom user_id (foreignId, nullable, constrained ke tabel users, nullOnDelete).
- Relasi: User (1) memiliki banyak (N) Booking; Room (1) memiliki banyak (N) Booking.
