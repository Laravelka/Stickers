<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaidStickersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('paid_stickers', function (Blueprint $table) {
			$table->id();
			$table->string('bill_id')->nullable();
			$table->boolean('is_paid')->default(0);
			
			$table->unsignedBigInteger('user_id');
			$table->unsignedBigInteger('sticker_id');

			$table->foreign('user_id')->references('id')->on('users');
			$table->foreign('sticker_id')->references('id')->on('stickers');

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
		Schema::dropIfExists('paid_stickers');
	}
}
