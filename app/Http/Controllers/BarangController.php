<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarangController extends Controller
{
    public function index()
    {
        $barang = Barang::all();
        return inertia('Barang/Index', ['barang' => $barang]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_barang' => 'required',
            'nomer_barang' => 'required',
            'asal_barang' => 'required',
        ]);
        Barang::create($request->all());
        return redirect()->back();
    }

    public function update(Request $request, Barang $barang)
    {
        $request->validate([
            'nama_barang' => 'required',
            'nomer_barang' => 'required',
            'asal_barang' => 'required',
        ]);
        $barang->update($request->all());
        return redirect()->back();
    }

    public function destroy(Barang $barang)
    {
        $barang->delete();
        return redirect()->back();
    }
}