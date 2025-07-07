<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    protected $table = 'barang';
    protected $fillable = [
        'nama_barang',
        'nomer_barang',
        'asal_barang',
        'gambar', 
    ];
}
