<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('automobili')->middleware('auth:api')->group(function () {
    Route::get('', 'AutomobilController@get');
    Route::get('/{automobil}', 'AutomobilController@show');
    Route::get('/search', 'AutomobilController@search');

    Route::middleware('auth.admin')->group(function () {
        Route::post('', 'AutomobilController@post');
        Route::delete('/{automobil}', 'AutomobilController@delete');
        Route::put('/{automobil}', 'AutomobilController@update');
    });
});

Route::prefix('modeli')->middleware('auth:api')->group(function () {
    Route::get('', 'ModelAutomobilaController@get');

    Route::middleware('auth.admin')->group(function () {
        Route::post('', 'ModelAutomobilaController@post');
        Route::delete('/model', 'ModelAutomobilaController@delete');
    });
});

Route::prefix('parkinzi')->middleware('auth:api')->group(function () {
    Route::get('', 'ParkingController@get');
    Route::get('/{parking}', 'ParkingController@show');

    Route::middleware('auth.admin')->group(function () {
        Route::post('', 'ParkingController@post');
        Route::delete('/{parking}', 'ParkingController@delete');
    });
});

Route::post('rezervacije', 'RezervacijaController@post');
Route::get('rezervacije', 'RezervacijaController@get');
Route::delete('/rezervacije/{rezervacija}', 'RezervacijaController@delete');
Route::prefix('rezervacije')->middleware('auth:api')->group(function () {
    Route::get('/moje', 'RezervacijaController@moje');
    Route::get('/automobili/{automobil}', 'RezervacijaController@automobil');

});
