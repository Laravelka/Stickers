<?php

namespace App\Http\Controllers\Api;

use App\{ PaidSticker, StickerImage, Sticker, User };
use ATehnix\VkClient\Requests\Request as VkRequest;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\{ DB, Log, Storage };
use ATehnix\VkClient\Client;
use Illuminate\Http\Request;

class StickerController extends Controller
{
	public function getAll(Request $request)
	{
		$user = User::checkToken($request->token);

		if (!$user)
		{
			$code = 401;
			$response = [
				'error' => true,
				'message' => 'API токен не действителен'
			];
		}
		else
		{
			$stickers = DB::table(DB::raw('stickers AS S'))
				->select('S.*', 'SI.url', 'PS.is_paid')
				->leftJoin(DB::raw('paid_stickers AS PS'), 'PS.id', '=', DB::raw('(SELECT id FROM paid_stickers AS PS2 WHERE PS.sticker_id = S.id AND PS.user_id = '.$user->id.' LIMIT 1)'))
				->leftJoin(DB::raw('stickers_image AS SI'), 'SI.id', '=', DB::raw('(SELECT id FROM stickers_image AS SI2 WHERE SI2.sticker_id = S.id ORDER BY `created_at` DESC LIMIT 1)'))
				->get();

			if ($stickers->isEmpty())
			{
				$code = 400;
				$response = [
					'error' => true,
					'message' => 'Стикеров еще нет'
				];
			}
			else
			{
				$response = [
					'stickers' => $stickers
				];
			}
		}
		return response()->json($response, $code ?? 200);
	}

	public function getById(Request $request)
	{
		$user = User::checkToken($request->token);

		if (!$user)
		{
			$code = 401;
			$response = [
				'error' => true,
				'message' => 'API токен не действителен'
			];
		}
		else
		{
			$sticker =	Sticker::where('id', '=', $request->id)->whereHas('paidStickers', function(Builder $query) use($user, $request) {
				$query->where('user_id', '=', $user->id);
			})->first();
			
			if (!empty($sticker))
			{
				$response = [
					'sticker' => array_merge(
						$sticker->toArray(), 
						['images' => $sticker->stickersImage()->select('url')->get()],
						$sticker->paidStickers()->select('is_paid')->first()->toArray(),
					)
				];
			}
			else
			{
				$sticker = Sticker::find($request->id);

				if ($sticker)
				{
					$response = [
						'sticker' => array_merge(
							$sticker->toArray(), 
							['images' => $sticker->stickersImage()->select('url')->get()],
						)
					];
				}
				else
				{
					$code = 400;
					$response = [
						'error' => true,
						'message' => 'Стикер не найден'
					];
				}
			}
		}
		return response()->json($response, $code ?? 200);
	}

	public function installation(Request $request, Client $api)
	{
		$user = User::checkToken($request->token);
		$sticker = Sticker::find($request->id);

		if (!$user)
		{
			$code = 401;
			$response = [
				'error' => true,
				'message' => 'API токен не действителен'
			];
		}
		elseif (!$sticker)
		{
			$code = 400;
			$response = [
				'error' => true,
				'message' => 'Стикер не найден'
			];
		}
		else
		{
			$images = $sticker->stickersImage()->select('url')->get()->toArray();

			if (!empty($images))
			{
				$newImages = [];
				foreach ($images as $image) {
					$newImages[] = [
						'url' => $image['url'],
						'title' => $sticker->title
					];
				}

				$response = [
					'images' => $newImages
				];

				/*
				$api->setDefaultToken($user->access_token);

				$return = false;
				foreach ($images as $image) {
					$return = $this->uploadToDocuments($image['url'], $sticker, $api);
				}
				
				if ($return)
				{
					$response = [
						'message' => 'Стикеры успешно установлены.'
					];
				}
				else
				{
					$code = 500;
					$response = [
						'error' => true,
						'message' => 'Ошибка установки'
					];
				}*/
			}
			else
			{
				$code = 500;
				$response = [
					'error' => true,
					'message' => 'Стикеров нет'
				];
			}
		}
		return response()->json($response, $code ?? 200);
	}

	public function sendFiles(Request $request, Client $api)
	{
		$user = User::checkToken($request->token);
		$sticker = Sticker::find($request->id);

		if (!$user)
		{
			$code = 401;
			$response = [
				'error' => true,
				'message' => 'API токен не действителен'
			];
		}
		elseif (!$sticker)
		{
			$code = 400;
			$response = [
				'error' => true,
				'message' => 'Стикер не найден'
			];
		}
		else
		{
			$response = $this->uploadFile($request->url, Storage::disk('public')->path($request->file));
		}
		return response()->json($response, $code ?? 200);
	}

	private function uploadToDocuments($file, $sticker, $api) {

		$request = new VkRequest('docs.getUploadServer', []);
		$response = $api->send($request);

		$path = Storage::disk('public')->path($file);

		if (empty($response['response']['upload_url']))
		{
			return false;
		}
		else
		{
			$response = $this->uploadFile($response['response']['upload_url'], $path);

			$request = new VkRequest('docs.save', [
				'title' => $sticker->title,
				'file' => $response['file']
			]);
			$response = $api->send($request);

			if (!empty($response['response'][0]))
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}

	private function uploadFile($url, $file, $data = []) {
		$cFile = curl_file_create($file);
		$post = array_merge(['file' => $cFile], $data);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST,1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$result = json_decode(curl_exec($ch), true);
		curl_close ($ch);

		return $result;
	}
}
