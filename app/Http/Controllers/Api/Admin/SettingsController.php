<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Config;

class SettingsController extends Controller
{
	public function getAll(Request $request) {
		$configs = Config::get();
		
		if (!$configs->isEmpty())
		{
			$newConfigs = [];
			foreach($configs->toArray() as $config)
			{
				$newConfigs[$config['key']] = $config['value'];
			}
			
			$response = [
				'configs' => $newConfigs
			];
		}
		else
		{
			$code = 400;
			$response = [
				'error' => true,
				'message' => 'Настроек еще нет'
			];
		}
		return response()->json($response, $code ?? 200);
	}
	
	public function update(Request $request)
	{
		$inputs = $request->all();
		$validator = Validator::make($inputs, [
			'vk_appId' => 'required|numeric',
			'qiwi_public' => 'required|string',
			'qiwi_secret' => 'required|string',
			'vk_secretKey' => 'required|string',
			'vk_serviceKey' => 'required|string',
			'vk_accessToken' => 'required|string',
		]);
		
		if ($validator->fails())
		{
			$code = 400;
			$response = [
				'error' => true,
				'messages' => $validator->errors()
			];
		}
		else
		{
			foreach($inputs as $key => $value)
			{
				Config::setData($key, $value);
			}
			
			$response = [
				'message' => 'Настройки сохранены успешно!'
			];
		}
		return response()->json($response, $code ?? 200);
	}
}
