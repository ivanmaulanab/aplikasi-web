<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'email' => 'rani.amelia@student.ac.id',
                'name' => 'Rani Amelia',
                'password' => Hash::make('password123'),
                'nim' => '24051130047',
                'prodi' => 'Teknologi Informasi',
                'fakultas' => 'Fakultas Teknik',
                'no_telp' => '081234567890',
                'status_akun' => 'Mahasiswa Aktif',
            ],
            [
                'email' => 'budi.santoso@student.ac.id',
                'name' => 'Budi Santoso',
                'password' => Hash::make('password123'),
                'nim' => '24051130088',
                'prodi' => 'Sistem Informasi',
                'fakultas' => 'Fakultas Ilmu Komputer',
                'no_telp' => '089876543210',
                'status_akun' => 'Mahasiswa Aktif',
            ],
            [
                'email' => 'yanto@student.ac.id',
                'name' => 'Yanto Kurniawan',
                'password' => Hash::make('password123'),
                'nim' => '24051130099',
                'prodi' => 'Teknik Elektro',
                'fakultas' => 'Fakultas Teknik',
                'no_telp' => '085612345678',
                'status_akun' => 'Mahasiswa Aktif',
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }
    }
}
