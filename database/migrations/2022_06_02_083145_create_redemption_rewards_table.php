<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRedemptionRewardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('redemption_rewards', function (Blueprint $table) {
            $table->id();
            $table->string('reward_title');
            $table->bigInteger('reward_point');
            $table->bigInteger('prev_reward_id');
            $table->bigInteger('plan_id');
            $table->bigInteger('product_id');
            $table->bigInteger('variant_id');
            $table->string('image_src');
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
        Schema::dropIfExists('redemption_rewards');
    }
}
