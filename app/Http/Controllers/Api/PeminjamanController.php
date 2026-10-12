<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Peminjaman;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PeminjamanController extends Controller
{
    /**
     * Menampilkan semua data peminjaman barang.
     * Method: GET /api/peminjaman
     */
    public function index(): JsonResponse
    {
        $peminjaman = Peminjaman::orderBy('id', 'desc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar data peminjaman berhasil diambil',
            'data'    => $peminjaman,
        ], 200);
    }

    /**
     * Menyimpan data peminjaman barang baru.
     * Method: POST /api/peminjaman
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nama_peminjam'  => 'required|string|max:255',
            'nama_barang'    => 'required|string|max:255',
            'tanggal_pinjam' => 'required|date',
            'status'         => 'nullable|string|in:Menunggu,Disetujui,Ditolak,Dikembalikan',
            'jumlah'         => 'nullable|integer|min:1',
            'keperluan'      => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $peminjaman = Peminjaman::create([
            'nama_peminjam'  => $request->input('nama_peminjam'),
            'nama_barang'    => $request->input('nama_barang'),
            'tanggal_pinjam' => $request->input('tanggal_pinjam'),
            'status'         => $request->input('status', 'Menunggu'),
            'jumlah'         => $request->input('jumlah', 1),
            'keperluan'      => $request->input('keperluan'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data peminjaman berhasil ditambahkan',
            'data'    => $peminjaman,
        ], 201);
    }

    /**
     * Menampilkan detail satu data peminjaman.
     * Method: GET /api/peminjaman/{id}
     */
    public function show(int|string $id): JsonResponse
    {
        $peminjaman = Peminjaman::find($id);

        if (!$peminjaman) {
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail data peminjaman berhasil diambil',
            'data'    => $peminjaman,
        ], 200);
    }

    /**
     * Memperbarui data / status peminjaman.
     * Method: PUT/PATCH /api/peminjaman/{id}
     */
    public function update(Request $request, int|string $id): JsonResponse
    {
        $peminjaman = Peminjaman::find($id);

        if (!$peminjaman) {
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nama_peminjam'  => 'sometimes|required|string|max:255',
            'nama_barang'    => 'sometimes|required|string|max:255',
            'tanggal_pinjam' => 'sometimes|required|date',
            'status'         => 'sometimes|required|string|in:Menunggu,Disetujui,Ditolak,Dikembalikan',
            'jumlah'         => 'nullable|integer|min:1',
            'keperluan'      => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $peminjaman->update($request->only([
            'nama_peminjam',
            'nama_barang',
            'tanggal_pinjam',
            'status',
            'jumlah',
            'keperluan',
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Data peminjaman berhasil diperbarui',
            'data'    => $peminjaman,
        ], 200);
    }

    /**
     * Menghapus data peminjaman.
     * Method: DELETE /api/peminjaman/{id}
     */
    public function destroy(int|string $id): JsonResponse
    {
        $peminjaman = Peminjaman::find($id);

        if (!$peminjaman) {
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan',
            ], 404);
        }

        $peminjaman->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data peminjaman berhasil dihapus',
        ], 200);
    }
}
