<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ModelAutomobila extends Model
{
    protected $table = 'model_automobila';
    protected $primaryKey = 'id_model';
    protected $fillable = [
        'model',
        'marka',
        'slika',
    ];
    public function automobili()
    {
        return $this->hasMany(Automobil::class);
    }
}
