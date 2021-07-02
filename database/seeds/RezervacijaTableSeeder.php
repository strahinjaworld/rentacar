<?php

use App\Automobil;
use App\Rezervacija;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class RezervacijaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 50; $i++) {
            $datumOd = Carbon::today()->addDays(rand(1, 150));
            $datumDo = $datumOd->copy()->addDays(rand(2, 8));
            $id_automobil = rand(1, 20);
            if (Automobil::find($id_automobil)->rezervisan($datumOd, $datumDo)) echo $i;
            else
                Rezervacija::insert([
                    'id_user' => rand(1, 5),
                    'id_automobil' =>  $id_automobil,
                    'datum_od' => $datumOd,
                    'datum_do' => $datumDo
                ]);
        }
    }
}
