<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function csrfToken(): JsonResponse
    {
        return response()->json([
            'csrfToken' => csrf_token(),
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', 'in:user,admin'],
            'remember' => ['sometimes', 'boolean'],
        ], [
            'password.min' => 'Password minimal 6 karakter.',
        ]);

        if (! Auth::guard('web')->attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ], $request->boolean('remember'))) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau password salah.',
            ], 401);
        }

        $user = Auth::guard('web')->user();

        if (! $user instanceof User || ! in_array($credentials['role'], $user->availableRoles(), true)) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json([
                'success' => false,
                'message' => 'Akun ini tidak memiliki akses untuk peran yang dipilih.',
            ], 403);
        }

        $request->session()->regenerate();
        $request->session()->put('active_role', $credentials['role']);

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil.',
            'role' => $credentials['role'],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil.',
        ]);
    }
}
