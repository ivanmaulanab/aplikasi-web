<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PeminjamanController;

/*
|--------------------------------------------------------------------------
| API Routes - SIPINJAM
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider or bootstrap/app.php
| and assigned to the "api" middleware group.
|
*/

// Health check endpoint
Route::get('/ping', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API SIPINJAM Backend is running',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// REST API Peminjaman Barang / Alat
Route::apiResource('peminjaman', PeminjamanController::class);

// Alternatif route eksplisit jika dibutuhkan:
// Route::get('/peminjaman', [PeminjamanController::class, 'index']);
// Route::post('/peminjaman', [PeminjamanController::class, 'store']);
// Route::get('/peminjaman/{id}', [PeminjamanController::class, 'show']);
// Route::put('/peminjaman/{id}', [PeminjamanController::class, 'update']);
// Route::delete('/peminjaman/{id}', [PeminjamanController::class, 'destroy']);
