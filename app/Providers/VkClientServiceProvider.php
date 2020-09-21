<?php

namespace App\Providers;

use App\Config;
use ATehnix\VkClient\Client;
use Illuminate\Support\ServiceProvider;

class VkClientServiceProvider extends ServiceProvider
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
			$client->setDefaultToken(Config::getData('vk_accessToken'));
			
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
