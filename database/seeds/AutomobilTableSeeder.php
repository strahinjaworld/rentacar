<?php

use App\Automobil;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AutomobilTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 20; $i++) {
            Automobil::insert([
                'registracija' => Str::random(6),
                'cena_na_dan' => 100 * rand(15, 50),
                'id_model' => rand(1, 5),
                'id_parking' => rand(1, 3)
            ]);
        }
    }
}
