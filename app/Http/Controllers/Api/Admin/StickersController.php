<?php

namespace App\Http\Controllers\Api\Admin;

use App\{ PaidSticker, StickerImage, Sticker, User };
use Illuminate\Support\Facades\{ DB, Log, Storage };
use ATehnix\VkClient\Requests\Request as VkRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use ATehnix\VkClient\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class StickersController extends Controller
{
	public function create(Request $request) {
		$inputs = $request->all();
		
		$validator = Validator::make($inputs, [
			'price' => 'required|numeric',
			'title' => 'required|string|min:3|max:255',
			'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:102400',
			'description' => 'required|string|min:3|max:255',
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
			$files = array_filter($inputs, function($item) use($inputs) {
				return strpos(array_search($item, $inputs), 'images') !== false;
			});
			
			if (empty($files))
			{
				$code = 400;
				$response = [
					'error' => true,
					'message' => 'Отправьте изображения'
				];
			}
			else
			{
				$sticker = Sticker::create([
					'title' => $inputs['title'],
					'price' => $inputs['price'],
					'description' => $inputs['description']
				]);
				
				if ($sticker)
				{
					$destinationPath = public_path('storage/stickers/'.$sticker->id.'/');
					
					$images = [];
					foreach($files as $file) {
						$name = Str::random(20).'.'.$file->extension();
						if ($file->move($destinationPath, $name))
						{
							$images[] = $sticker->stickersImage()->create([
								'url' => '/stickers/'.$sticker->id.'/'.$name
							]);
						}
					}
					
					$response = [
						'message' => 'Стикер успешно добавлен!'
					];
				}
				else
				{
					$code = 500;
					$response = [
						'error' => true,
						'message' => 'Ошибка сервера'
					];
				}
			}
		}
		return response()->json($response, $code ?? 200);
	}
	
	public function getAll(Request $request) {
		$stickers = Sticker::get();
		
		if (!$stickers->isEmpty())
		{
			$newStickers = [];
			foreach($stickers as $key => $sticker) {
				$newStickers[$key] = $sticker;
				$newStickers[$key]['images'] = $sticker->stickersImage()->get();
			}
			$response = [
				'stickers' => $newStickers
			];
		}
		else
		{
			$code = 400;
			$response = [
				'error' => true,
				'message' => 'Стикеров еще нет'
			];
		}
		return response()->json($response, $code ?? 200);
	}
	
	public function getById(Request $request) {
		$sticker = Sticker::find($request->id ?? 0)->first();
		
		if ($sticker)
		{
			$images = $sticker->stickersImage()->get()->toArray();
				
			$response = [
				'sticker' => array_merge(
					$sticker->toArray(),
					['images' => $images]
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
		return response()->json($response, $code ?? 200);
	}
	
	public function getPaid(Request $request) {
		$paids = DB::select('
		SELECT `s`.`price`,
			   `ps`.`user_id`,
			   `u`.`nick`,
			   `u`.`vk_id`,
			   `u`.`avatar`
		FROM `paid_stickers` `ps`,
			 `stickers` `s`,
			 `users` `u`
		WHERE `ps`.`is_paid` = 1
		  AND `s`.`id` = `ps`.`sticker_id`
		  AND `u`.`id` = `ps`.`user_id`
  		');
		
		if (empty($paids))
		{
			$code = 400;
			$response = [
				'error' => true,
				'message' => 'Платежей еще нет'
			];
		}
		else
		{
			$response = [
				'paids' => $paids
			];
		}
		return response()->json($response, $code ?? 200);
	}
	
	public function delete(Request $request) {
		$sticker = Sticker::find($request->id ?? 0);
		
		if (!$sticker)
		{
			$code = 400;
			$response = [
				'error' => true,
				'message' => 'Стикер не найден'
			];
		}
		else
		{
			$directory = '/stickers/'.$sticker->id.'/';
			
			$sticker->stickersImage()->delete();
			$sticker->delete();
			
			if (Storage::disk('public')->deleteDirectory($directory))
			{
				$response = [
					'message' => 'Стикер удален успешно!'
				];
			}
			else
			{
				$code = 500;
				$response = [
					'error' => true,
					'message' => 'Ошибка удаления изображений'
				];
			}
		}
		return response()->json($response, $code ?? 200);
	}
}
