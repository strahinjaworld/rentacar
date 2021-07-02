<?php

namespace App\Http\Controllers;

use App\Automobil;
use App\Parking;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AutomobilController extends Controller
{
    public function get(Request $request)
    {
        if ($request->get('parkingId'))
            return response()->json(['automobili' => Parking::find($request->get('parkingId'))->automobili()->with('model')->paginate(9)], 200);

        return response()->json(['automobili' => Automobil::with('model', 'parking')->paginate(9)], 200);
    }
    public function show(Automobil $automobil)
    {
        return response()->json(['automobil' => $automobil->with('model')->first()], 200);
    }
    public function search(Request $request)
    {
        if ($request->query('id_model'))
            return response()->json(['automobili' => Automobil::where('id_model', $request->id_model)], 200);
        return response()->json(['poruka' => 'Greska!'], 400);
    }
    public function post(Request $request)
    {
        $validated = $request->validate([
            'id_model' => 'required',
            'id_parking' => 'required',
            'cena_na_dan' => 'required',
            'registracija' => 'required',
        ]);

        Automobil::create(
            [
                'id_model' => $request->id_model,
                'id_parking' => $request->id_parking,
                'cena_na_dan' => $request->id_cena_na_dan,
                'registracija' => $request->id_registracija,
            ]
        );
    }

    public function update(Request $request, Automobil $automobil)
    {
        $validated = $request->validate([
            'id_model' => 'required',
            'id_parking' => 'required',
            'cena_na_dan' => 'required',
            'registracija' => "required|unique:automobil,id_automobil,$automobil->id_automobil,id_automobil"
        ]);
        $automobil->id_model = $request->id_model;
        $automobil->id_parking = $request->id_parking;
        $automobil->cena_na_dan = $request->cena_na_dan;
        $automobil->registracija = $request->registracija;

        if ($automobil->save()) {
            return response()->json(['poruka' => 'Uspesno ste izmenili automobil!'], 200);
        }
        return response()->json(['poruka' => 'Greska!'], 400);
    }
    public function delete(Automobil $automobil)
    {
        if ($automobil->delete())
            return response()->json(['poruka' => 'Uspesno obrisan automobil'], 200);
        return response()->json(['poruka' => 'Greska prilikom brisanja automobila'], 400);
    }
}
