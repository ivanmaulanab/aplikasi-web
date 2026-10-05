<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        Room::truncate();
        Room::insert([
            [
                'name' => 'Lab Komputer 1',
                'capacity' => 30,
                'location' => 'Gedung A Lantai 2',
                'facilities' => '30 PC, LCD, AC, Internet',
                'is_available' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Ruang Seminar',
                'capacity' => 80,
                'location' => 'Gedung B Lantai 1',
                'facilities' => 'LCD, Sound System, AC',
                'is_available' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Ruang Rapat',
                'capacity' => 20,
                'location' => 'Gedung A Lantai 3',
                'facilities' => 'Meja Rapat, Proyektor, AC',
                'is_available' => false,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
