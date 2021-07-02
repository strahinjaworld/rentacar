<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('automobil', function (Blueprint $table) {
            $table->unsignedBigInteger('id_model');
            $table->foreign('id_model')->references('id_model')->on('model_automobila')->onDelete('cascade');
            $table->unsignedBigInteger('id_parking');
            $table->foreign('id_parking')->references('id_parking')->on('parking')->onDelete('cascade');
        });
        Schema::table('rezervacija', function (Blueprint $table) {
            $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('id_automobil');
            $table->foreign('id_automobil')->references('id_automobil')->on('automobil')->onDelete('cascade');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('id_role');
            $table->foreign('id_role')->references('id')->on('roles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
