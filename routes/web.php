<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use App\Models\Booking;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect()->route('rooms.index'))->name('home');

Route::get('/dashboard', function () {
    $user  = auth()->user();$query = $user->isAdmin() ? Booking::query() : $user->bookings();

    return view('dashboard', [
        'total'   => (clone \$query)->count(),
        'pending' => (clone \$query)->where('status', 'pending')->count(),
    ]);
})->middleware('auth')->name('dashboard');

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::resource('rooms', RoomController::class)->except(['index', 'show']);
    Route::patch('bookings/{booking}/approve', [BookingController::class, 'approve'])->name('bookings.approve');
    Route::patch('bookings/{booking}/reject', [BookingController::class, 'reject'])->name('bookings.reject');
});

Route::resource('rooms', RoomController::class)->only(['index', 'show']);

Route::middleware('auth')->group(function () {
    Route::resource('bookings', BookingController::class)->except(['show']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
