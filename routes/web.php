<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BookingController;

Route::resource('rooms', RoomController::class);
Route::resource('bookings', BookingController::class);

Route::get('/', function () {
    return redirect('/peminjaman');
});

Route::get('/peminjaman', function () {
    return view('peminjaman.index');
});

Route::get('/peminjaman/detail/{id}', function ($id) {
    return view('peminjaman.detail', ['id' => $id]);
});