<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BarangController;
use App\Models\Barang;
use App\Http\Controllers\LandingPageController;

Route::get('/', function () {
    $barang = Barang::all();
    return inertia('Dashboard', ['barang' => $barang]);
});

// Tambahkan ini untuk debugging, sementara nonaktifkan Route::resource dulu jika ada
Route::post('/barang', [BarangController::class, 'store'])->name('barang.store.manual');
// Route::resource('barang', BarangController::class); // Jika ada, komen dulu

Route::get('/landing', [LandingPageController::class, 'index'])->name('landing');