<?php

use App\Roles;
use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Roles::insert([
            'naziv' => 'admin',
        ]);
        Roles::insert([
            'naziv' => 'klijent',
        ]);
    }
}
