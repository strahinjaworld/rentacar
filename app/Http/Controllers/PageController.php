<?php

namespace App\Http\Controllers;

use App\Parking;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function parkinzi()
    {
        return view('parkinzi');
    }

    public function automobili()
    {
        return view('automobili');
    }
    public function automobil($automobil)
    {
        return view('automobil', ['automobilId' => $automobil]);
    }

    public function parking($parking)
    {
        return view('parking', ['id_parking' => $parking]);
    }
    public function admin()
    {
        return view('admin');
    }
    public function rezervacije()
    {
        return view('admin-rezervacije');
    }
}
