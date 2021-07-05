<?php

namespace App\Http\Controllers;

use App\Automobil;
use App\Rezervacija;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;

class RezervacijaController extends Controller
{
    public function get()
    {
        $getData = DB::table('rezervacija')
            ->join('users', 'users.id', '=', 'rezervacija.id_user')->get();

        $datatable = DataTables::of($getData)->make(true);
        return $datatable;
    }

    public function moje()
    {
        return response()->json(['rezervacije' => Auth::user()->rezervacije], 200);
    }
    public function automobil(Automobil $automobil)
    {

        return response()->json(['rezervacije' => $automobil->rezervacije], 200);
    }

    public function post(Request $request)
    {
        $validated = $request->validate([
            'id_automobil' => 'required',
            'datum_od' => 'required',
            'datum_do' => 'required'
        ]);
        $automobil = Automobil::find($request->id_automobil);
        $user = auth('api')->user();
        if (!$automobil->rezervisan($request->datum_od, $request->datum_do)) {
            Rezervacija::create(
                [
                    'id_automobil' => $request->id_automobil,
                    'datum_od' => $request->datum_od,
                    'datum_do' => $request->datum_do,
                    'id_user' => $user->id
                ]
            );
            $cenaRezervacije = Carbon::parse($request->datum_od)
                ->diff(Carbon::parse($request->datum_do))
                ->days * $automobil->cena_na_dan;

            return response()->json(['poruka' => 'Automobil uspesno rezervisan! Cena rezervacije: ' . $cenaRezervacije], 200);
        }
        return response()->json(['poruka' => 'Automobil je rezervisan u tom periodu!'], 400);
    }

    public function delete(Rezervacija $rezervacija)
    {
        if ($rezervacija->delete())
            return response()->json(['poruka' => 'Uspesno brisanje rezervacije'], 200);
        return response()->json(['poruka' => 'Greska prilikom brisanja!'], 200);
    }
}
