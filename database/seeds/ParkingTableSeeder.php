<?php

use App\Parking;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ParkingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        for ($i = 0; $i < 3; $i++) {
            Parking::insert([
                'adresa' =>  Str::random(rand(4, 6)) . ',' . rand(1, 50),
                'naziv' => 'Parking ' . ($i + 1),
            ]);
        }
    }
}
