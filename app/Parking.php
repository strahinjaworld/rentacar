<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Parking extends Model
{
    protected $table = 'parking';
    protected $primaryKey = 'id_parking';

    public function automobili()
    {
        return $this->hasMany(Automobil::class, 'id_parking', 'id_parking');
    }
}
