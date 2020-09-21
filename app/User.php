<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
	use Notifiable;

	protected $fillable = [
		'nick', 'avatar', 'vk_id', 'api_token', 'allow_notify', 'access_token',
	];

	protected $hidden = [
		'password', 'remember_token',
	];
	
	public static function isValid(): bool
	{
		$response = false;
		
		$query_params = [];
		parse_str(parse_url(request()->fullUrl(), PHP_URL_QUERY), $query_params);

		$sign_params = []; 
		foreach ($query_params as $name => $value) { 
			if (strpos($name, 'vk_') !== 0) {
				continue; 
			}
			$sign_params[$name] = $value; 
		} 

		ksort($sign_params);
		$sign_params_query = http_build_query($sign_params);
		$sign = rtrim(strtr(base64_encode(hash_hmac('sha256', $sign_params_query, Config::getData('vk_secretKey'), true)), '+/', '-_'), '=');
		
		if (!empty(request()->input('sign')))
		{
			if ($sign === $query_params['sign'])
			{
				$response = true;
			}
		}
		return $response;
	}

	public static function checkToken($token)
	{
		return User::where('api_token', '=', $token)->first();
	}

	public function paidStickers()
	{
		return $this->hasMany(PaidSticker::class);
	}
}
