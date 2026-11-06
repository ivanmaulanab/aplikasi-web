<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@ruangkampus.test'],
            [
                'name'     => 'Admin Ruang',
                'password' => Hash::make('password'),
                'role'     => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'peminjam@ruangkampus.test'],
            [
                'name'     => 'Mahasiswa Peminjam',
                'password' => Hash::make('password'),
                'role'     => 'peminjam',
            ]
        );
    }
}
