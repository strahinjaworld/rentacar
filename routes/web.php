<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::middleware('auth')->group(function () {
    Route::prefix('parkinzi')->group(function () {
        Route::get('/', 'PageController@parkinzi');
        Route::get('/{parking}', 'PageController@parking');
    });
    Route::prefix('automobili')->group(function () {
        Route::get('/', 'PageController@automobili');
        Route::get('/{automobil}', 'PageController@automobil');
    });
    Route::prefix('admin')->group(function () {
        Route::get('/', 'PageController@admin');
        Route::get('/rezervacije', 'PageController@rezervacije');
    });
});

Route::get('/test', 'AutomobilController@post');
