<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/peminjaman');
});

Route::get('/peminjaman', function () {
    return view('peminjaman.index');
});

Route::get('/peminjaman/detail/{id}', function ($id) {
    return view('peminjaman.detail', ['id' => $id]);
});