<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Parking;
use Illuminate\Support\Facades\Auth;

class ParkingController extends Controller
{
    public function get()
    {
        return response()->json(['parkinzi' => Parking::all()], 200);
    }
    public function show(Parking $parking)
    {
        return response()->json(['parking' => $parking->with('automobili')->get()], 200);
    }
    public function post(Request $request)
    {
        $validated = $request->validate([
            'adresa' => 'required',
            'naziv' => 'required',
        ]);

        Parking::create(
            [
                'adresa' => $request->adresa,
                'naziv' => $request->naziv
            ]
        );
    }

    public function delete(Parking $parking)
    {
        if ($parking->delete())
            return response()->json(['poruka' => 'Uspesno obrisan parking'], 200);
        return response()->json(['poruka' => 'Greska prilikom brisanja parkinga'], 400);
    }
}
