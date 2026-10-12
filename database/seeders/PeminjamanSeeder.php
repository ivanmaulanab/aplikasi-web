<?php

namespace Database\Seeders;

use App\Models\Peminjaman;
use Illuminate\Database\Seeder;

class PeminjamanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama_peminjam'  => 'Rani Amelia',
                'nama_barang'    => 'Proyektor Epson EB-X51',
                'tanggal_pinjam' => '2026-10-15',
                'status'         => 'Menunggu',
                'jumlah'         => 1,
                'keperluan'      => 'Seminar Akademik Mahasiswa',
            ],
            [
                'nama_peminjam'  => 'Budi Santoso',
                'nama_barang'    => 'Sound System Portable & 2 Mic Wireless',
                'tanggal_pinjam' => '2026-10-16',
                'status'         => 'Disetujui',
                'jumlah'         => 1,
                'keperluan'      => 'Praktikum Presentasi Jaringan Komputer',
            ],
            [
                'nama_peminjam'  => 'Dewi Lestari',
                'nama_barang'    => 'Kamera DSLR Canon EOS 80D',
                'tanggal_pinjam' => '2026-10-17',
                'status'         => 'Ditolak',
                'jumlah'         => 1,
                'keperluan'      => 'Dokumentasi Rapat Rutin BEM',
            ],
            [
                'nama_peminjam'  => 'Ahmad Fauzi',
                'nama_barang'    => 'Pointer Laser & Clicker Wireless',
                'tanggal_pinjam' => '2026-10-18',
                'status'         => 'Dikembalikan',
                'jumlah'         => 2,
                'keperluan'      => 'Workshop Kewirausahaan Mahasiswa Baru',
            ],
        ];

        foreach ($data as $item) {
            Peminjaman::create($item);
        }
    }
}
