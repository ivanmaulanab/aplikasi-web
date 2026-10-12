<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Mendapatkan profil pengguna aktif.
     * Method: GET /api/profile
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user() ?? Auth::user() ?? User::first();

        if (! $user) {
            $user = User::create([
                'name' => 'Rani Amelia',
                'email' => 'rani.amelia@student.ac.id',
                'password' => bcrypt('password123'),
                'nim' => '24051130047',
                'prodi' => 'Teknologi Informasi',
                'fakultas' => 'Fakultas Teknik',
                'no_telp' => '081234567890',
                'status_akun' => 'Mahasiswa Aktif',
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data profil berhasil diambil',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'nim' => $user->nim,
                'prodi' => $user->prodi,
                'fakultas' => $user->fakultas,
                'no_telp' => $user->no_telp,
                'status_akun' => $user->status_akun ?? 'Mahasiswa Aktif',
                'avatar' => $user->avatar,
                'created_at' => $user->created_at?->toIso8601String(),
                'updated_at' => $user->updated_at?->toIso8601String(),
            ],
        ], 200);
    }

    /**
     * Memperbarui profil pengguna aktif.
     * Method: PUT /api/profile
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user() ?? Auth::user() ?? User::first();

        if (! $user) {
            $user = User::create([
                'name' => 'Rani Amelia',
                'email' => 'rani.amelia@student.ac.id',
                'password' => bcrypt('password123'),
                'nim' => '24051130047',
                'prodi' => 'Teknologi Informasi',
                'fakultas' => 'Fakultas Teknik',
                'no_telp' => '081234567890',
                'status_akun' => 'Mahasiswa Aktif',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'nim' => 'nullable|string|max:50',
            'prodi' => 'nullable|string|max:100',
            'fakultas' => 'nullable|string|max:100',
            'no_telp' => 'nullable|string|max:25|regex:/^[0-9+\-\s()]+$/',
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'name.min' => 'Nama lengkap minimal 3 karakter.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email ini sudah digunakan oleh akun lain.',
            'no_telp.regex' => 'Format nomor telepon hanya boleh berisi angka, spasi, plus, atau tanda minus.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal. Silakan periksa formulir.',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Keamanan: Hanya perbarui kolom data profil yang diizinkan (Cegah privilege escalation)
        $user->update([
            'name' => trim((string) $request->input('name')),
            'email' => trim((string) $request->input('email')),
            'nim' => $request->filled('nim') ? trim((string) $request->input('nim')) : null,
            'prodi' => $request->filled('prodi') ? trim((string) $request->input('prodi')) : null,
            'fakultas' => $request->filled('fakultas') ? trim((string) $request->input('fakultas')) : null,
            'no_telp' => $request->filled('no_telp') ? trim((string) $request->input('no_telp')) : null,
        ]);

        $freshUser = $user->fresh();

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui',
            'data' => [
                'id' => $freshUser->id,
                'name' => $freshUser->name,
                'email' => $freshUser->email,
                'nim' => $freshUser->nim,
                'prodi' => $freshUser->prodi,
                'fakultas' => $freshUser->fakultas,
                'no_telp' => $freshUser->no_telp,
                'status_akun' => $freshUser->status_akun ?? 'Mahasiswa Aktif',
                'avatar' => $freshUser->avatar,
                'created_at' => $freshUser->created_at?->toIso8601String(),
                'updated_at' => $freshUser->updated_at?->toIso8601String(),
            ],
        ], 200);
    }
}
