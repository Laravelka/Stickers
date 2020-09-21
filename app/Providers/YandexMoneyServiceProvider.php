<?php

namespace App\Providers;

use App\Config;
use YandexCheckout\Client;
use Illuminate\Support\ServiceProvider;

class YandexMoneyServiceProvider extends ServiceProvider
{
	/**
	 * Register services.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->singleton(Client::class, function() {
			$client = new Client();
			$client->setAuth(Config::getData('yandex_shopId'), Config::getData('yandex_secretKey'));
			return $client;
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
