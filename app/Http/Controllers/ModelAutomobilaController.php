<?php

namespace App\Http\Controllers;

use App\ModelAutomobila;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModelAutomobilaController extends Controller
{
    public function get()
    {
        return response()->json(['modeli' => ModelAutomobila::all()], 200);
    }
    public function post(Request $request)
    {
        $validated = $request->validate([
            'marka' => 'required',
            'model' => 'required',
        ]);
        $path = null;
        if ($request->hasFile('slika')) {
            $slika = $request->file('slika');
            $naziv = time() . '.' . $slika->getClientOriginalExtension();

            $path = $slika->storeAs('', $naziv, 'public');
        };

        if (ModelAutomobila::create(
            [
                'marka' => $request->marka,
                'model' => $request->model,
                'slika' => $path
            ]
        ))
            return response()->json(['poruka' => 'Uspesno kreiran model'], 200);
        return response()->json(['poruka' => 'Greska pri  kreiranju modela'], 200);
    }

    public function delete(Model $model)
    {
        if ($model->delete())
            return response()->json(['poruka' => 'Uspesno obrisan model'], 200);
        return response()->json(['poruka' => 'Greska prilikom brisanja modela'], 400);
    }
}
