<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('rooms.index');
});

Route::resource('rooms', RoomController::class);
Route::resource('bookings', BookingController::class);
