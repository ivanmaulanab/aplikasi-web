<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        return $this->profileResponse(
            $this->authenticatedUser($request),
            'Data profil berhasil diambil',
            $request->session()->get('active_role', 'user'),
        );
    }

    public function update(Request $request): JsonResponse
    {
        $user = $this->authenticatedUser($request);

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'nim' => ['nullable', 'string', 'max:50'],
            'prodi' => ['nullable', 'string', 'max:100'],
            'fakultas' => ['nullable', 'string', 'max:100'],
            'no_telp' => ['nullable', 'string', 'max:25', 'regex:/^[0-9+\-\s()]+$/'],
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

        $profile = $validator->validated();

        $user->update([
            'name' => trim($profile['name']),
            'email' => trim($profile['email']),
            'nim' => isset($profile['nim']) ? trim($profile['nim']) : null,
            'prodi' => isset($profile['prodi']) ? trim($profile['prodi']) : null,
            'fakultas' => isset($profile['fakultas']) ? trim($profile['fakultas']) : null,
            'no_telp' => isset($profile['no_telp']) ? trim($profile['no_telp']) : null,
        ]);

        return $this->profileResponse(
            $user->refresh(),
            'Profil berhasil diperbarui',
            $request->session()->get('active_role', 'user'),
        );
    }

    private function authenticatedUser(Request $request): User
    {
        $user = $request->user();

        abort_unless($user instanceof User, 401);

        return $user;
    }

    private function profileResponse(User $user, string $message, string $activeRole): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'nim' => $user->nim,
                'prodi' => $user->prodi,
                'fakultas' => $user->fakultas,
                'no_telp' => $user->no_telp,
                'status_akun' => $user->status_akun,
                'avatar' => $user->avatar,
                'roles' => $user->availableRoles(),
                'role' => $activeRole,
                'created_at' => $user->created_at?->toIso8601String(),
                'updated_at' => $user->updated_at?->toIso8601String(),
            ],
        ]);
    }
}
