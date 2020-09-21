<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use Carbon\Carbon;
use Illuminate\Support\Str;
use ATehnix\VkClient\Client;

class SignatureVerification
{
	protected $vk = null;

	public function __construct(Client $vk)
	{
		$this->vk = $vk;
	}

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		if (empty($request->input('sign')))
		{
			return response()->view('layout', [
				'error' => true,
				'message' => 'Сервис недоступен вне vk.'
			]);
		}
		else
		{
			if (User::isValid())
			{
				return response()->view('layout', [
					'error' => true,
					'message' => 'Подпись недействительна.'
				]);
			}
			else
			{
				if (!$checkUser = User::where('vk_id', '=', $request->input('vk_user_id'))->first())
				{
					$user = new User;
					$vkResponse = $this->vk->request('users.get', [
						'fields' => 'photo_400_orig',
						'user_ids' => $request->input('vk_user_id')
					]);
					$userData = (object) $vkResponse['response'][0];
					$userNick = $userData->first_name.' '.$userData->last_name;

					$user->nick = $userNick;
					$user->vk_id = $userData->id;
					$user->api_token = Str::random(80);
					$user->avatar = $userData->photo_400_orig;
					$user->created_at = Carbon::now();

					$user->save();
				}
				else
				{
					if ($checkUser->updated_at < Carbon::now()->subMinutes(3))
					{
						$checkUser->touch();
						$checkUser->save();
					}
				}
			}
		}
		return $next($request);
	}


}
