<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BarangController;
use App\Models\Barang;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\ProfileController;


Route::get('/', function () {
    $barang = Barang::all();
    return inertia('Dashboard', ['barang' => $barang]);
});

// Tambahkan ini untuk debugging, sementara nonaktifkan Route::resource dulu jika ada
Route::post('/barang', [BarangController::class, 'store'])->name('barang.store.manual');
// Route::resource('barang', BarangController::class); // Jika ada, komen dulu

Route::get('/landing', [LandingPageController::class, 'index'])->name('landing');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route dashboard jika ingin terpisah dari /
    Route::get('/dashboard', function () {
        $barang = \App\Models\Barang::all();
        return inertia('Dashboard', ['barang' => $barang]);
    })->name('dashboard');
});

require __DIR__.'/auth.php';