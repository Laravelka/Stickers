<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
	public function allowNotify(Request $request)
	{
		if (!empty($request->token))
		{
			$user = User::checkToken($request->token);
			$user->fill([
				'allow_notify' => 1
			]);
			$user->save();

			$response = [
				'message' => 'Данные успешно записаны.'
			];
		}
		else
		{
			$code = 400;
			$response = [
				'error' => true,
				'message' => 'Укажите token'
			];
		}
		return response()->json($response, $code ?? 200);
	}

	public function setAccessToken(Request $request)
	{
		if (!empty($request->access_token) && !empty($request->token))
		{
			$user = User::checkToken($request->token);
			$user->fill([
				'access_token' => $request->access_token
			]);
			$user->save();

			$response = [
				'message' => 'Токен успешно записан.'
			];
		}
		else
		{
			$code = 400;
			$response = [
				'error' => true,
				'message' => 'Укажите access_token'
			];
		}
		return response()->json($response, $code ?? 200);
	}
}
