<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rezervacija extends Model
{
    protected $table = 'rezervacija';
    protected $primaryKey = 'id_rezervacija';

    protected $fillable = [
        'id_automobil',
        'id_user',
        'datum_od',
        'datum_do'
    ];

    public function korisnik()
    {
        return $this->hasMany(User::class);
    }
    public function automobil()
    {
        return $this->hasMany(Automobil::class);
    }
}
