<?php

namespace App\Providers;

use Qiwi\Api\BillPayments;
use Illuminate\Support\ServiceProvider;

class QiwiServiceProvider extends ServiceProvider
{
	/**
	 * Register services.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->singleton(BillPayments::class, function() {
			return new BillPayments(config('qiwi.secret'));
		});
	}

	/**
	 * Bootstrap services.
	 *
	 * @return void
	 */
	public function boot()
	{
		//
	}
}
