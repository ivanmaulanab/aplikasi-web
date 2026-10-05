<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        Room::create([
            'name' => 'Lab Komputer 1',
            'capacity' => 40,
            'location' => 'Gedung Teknik Lt. 2',
            'facilities' => 'PC, Proyektor, AC',
            'is_available' => true,
        ]);

        Room::create([
            'name' => 'Ruang Seminar',
            'capacity' => 80,
            'location' => 'Gedung Utama Lt. 1',
            'facilities' => 'Proyektor, Sound System, AC',
            'is_available' => true,
        ]);
    }
}