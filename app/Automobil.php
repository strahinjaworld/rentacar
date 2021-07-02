<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Automobil extends Model
{
    protected $table = 'automobil';
    protected $primaryKey = 'id_automobil';


    protected $fillable = [
        'registracija',
        'istek_registracije',
        'cena_na_dan',
        'id_model',
        'id_parking'
    ];

    public function model()
    {
        return $this->belongsTo(ModelAutomobila::class, 'id_model', 'id_model');
    }
    public function rezervacije()
    {
        return $this->hasMany(Rezervacija::class, 'id_automobil', 'id_automobil');
    }

    public function parking()
    {
        return $this->belongsTo(Parking::class, 'id_parking', 'id_parking');
    }

    public function rezervisan($datumOd, $datumDo)
    {
        return $this->rezervacije()
            ->where('datum_do', '>', $datumOd)
            ->where('datum_od', '<', $datumDo)
            ->exists();
    }
}
