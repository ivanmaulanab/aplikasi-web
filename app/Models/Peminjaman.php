<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    /**
     * Nama tabel di database.
     */
    protected $table = 'peminjamans';

    /**
     * Atribut yang dapat diisi secara massal.
     */
    protected $fillable = [
        'nama_peminjam',
        'nama_barang',
        'tanggal_pinjam',
        'status',
        'jumlah',
        'keperluan',
    ];

    /**
     * Casting tipe data atribut.
     */
    protected $casts = [
        'tanggal_pinjam' => 'date',
        'jumlah' => 'integer',
    ];
}
