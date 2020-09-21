<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
	protected $table = 'config';
	
	protected $fillable = [
		'key',
		'value'
	];
	
	public static function setData($key, $value) {
		$config = Config::where('key', '=', $key)->first();
		
		if ($config)
		{
			return $config->update(['value' => $value]);
		}
		else
		{
			return Config::create([
				'key' => $key,
				'value' => $value
			]);
		}
	}
	
	public static function getData($key, $default = null) {
		$config = Config::where('key', '=', $key)->first();
		
		if ($config)
		{
			return $config->value;
		}
		elseif ($default)
		{
			return $default;
		}
		else
		{
			return false;
		}
	}
}
