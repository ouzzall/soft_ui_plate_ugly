<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRedemptionPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('redemption_plans', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->bigInteger('days');
            $table->bigInteger('orders');
            $table->bigInteger('min_orders_amount');
            $table->bigInteger('percentage');
            $table->string('star');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('redemption_plans');
    }
}
