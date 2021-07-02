<?php

use App\ModelAutomobila;
use Illuminate\Database\Seeder;

class ModelAutomobilaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ModelAutomobila::insert([
            'marka' => 'Audi',
            'model' => 'A6',
        ]);
        ModelAutomobila::insert([
            'marka' => 'BMW',
            'model' => 'X3',
        ]);
        ModelAutomobila::insert([
            'marka' => 'Citroen',
            'model' => 'C3',
        ]);
        ModelAutomobila::insert([
            'marka' => 'Volkswagen',
            'model' => 'Golf 5',
        ]);
        ModelAutomobila::insert([
            'marka' => 'Opel',
            'model' => 'Corsa',
        ]);
    }
}
