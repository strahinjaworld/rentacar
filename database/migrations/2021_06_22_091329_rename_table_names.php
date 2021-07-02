<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameTableNames extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('automobils', 'automobil');
        Schema::rename('model_automobilas', 'model_automobila');
        Schema::rename('parkings', 'parking');
        Schema::rename('rezervacijas', 'rezervacija');
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
