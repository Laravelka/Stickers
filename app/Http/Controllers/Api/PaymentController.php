<?php

namespace App\Http\Controllers\Api;

use ATehnix\VkClient\Requests\Request as VkRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use \Illuminate\Support\Str;
use Illuminate\Http\Request;
use ATehnix\VkClient\Client;
use Qiwi\Api\BillPayments;
use App\{ User, Sticker, PaidSticker };
use Carbon\Carbon;

class PaymentController extends Controller
{
	public function qiwiWebhook(Request $request, BillPayments $qiwi, Client $api) {
		$check = $qiwi->checkNotificationSignature(
			$request->header('X-Api-Signature-SHA256'), $request->all(), config('qiwi.secret')
		);
		
		Log::info('QIWI WEBHOOK: ', [$request->header('X-Api-Signature-SHA256'), $request->all()]);

		if ($check)
		{
			$inputs = $request->all();

			if (!empty($inputs['bill']))
			{
				$billId = $inputs['bill']['billId'];

				$paidSticker = PaidSticker::where('bill_id', '=', $billId)->first();

				if ($request['bill']['status']['value'] == 'PAID' && $paidSticker)
				{
					$api->setDefaultToken(config('vk.serviceKey'));

					$request = new VkRequest('notifications.sendMessage', [
						'message' => 'Стикеры успешно оплачены!',
						'user_ids' => $paidSticker->user()->first()->vk_id,
						'fragment' => '/sticker/'.$paidSticker->sticker_id,
						'group_id' => 125492813,
						'random_int' => random_int(111111, 999999999),
					]);
					$response = $api->send($request);

					Log::info('SEND NOTIFY: ', $response);

					$paidSticker->is_paid = 1;
					$paidSticker->save();
				}
				else
				{
					$api->setDefaultToken(config('vk.serviceKey'));

					$request = new VkRequest('notifications.sendMessage', [
						'message' => 'Счет не был оплачен!',
						'user_ids' => $paidSticker->user()->vk_id,
						'fragment' => '/sticker/'.$paidSticker->sticker_id,
						'group_id' => 125492813,
						'random_int' => random_int(111111, 999999999),
					]);
					$response = $api->send($request);

					Log::info('SEND NOTIFY(2): ', $response);
				}
			}
		}
		return 'OK';
	}

	public function yandexWebhook(Request $request, Client $api)
	{
		Log::info('YANDEX WEBHOOK: ', $request->all());
		
		if (!empty($request->notification_type))
		{
			$label = $request->label;
			$amount = $request->amount;
			
			if (!empty($label))
			{
				$explode = explode('|', $label);
				$userToken = $explode[0];
				$stickerId = $explode[1];

				$user = User::find($userToken);
				$sticker = Sticker::find($stickerId);

				$paidSticker = $user->paidStickers()->create([
					'is_paid' => 1,
					'bill_id' => $label,
					'sticker_id' => $sticker->id,
				]);

				$api->setDefaultToken(config('vk.serviceKey'));

				$request = new VkRequest('notifications.sendMessage', [
					'message' => 'Стикеры успешно оплачены!',
					'user_ids' => $user->vk_id,
					'fragment' => '/sticker/'.$sticker->id,
					'group_id' => 125492813,
					'random_int' => random_int(111111, 999999999),
				]);
				$response = $api->send($request);

				Log::info('SEND NOTIFY(3): ', $response);
			}
			else
			{
				Log::error('Не указан label: ', $request->all());
			}
		}
		else
		{
			Log::error('запрос не от яндекса: ', $request->all());
		}
		return 'OK';
	}

	public function invoicingQiwi(Request $request, BillPayments $qiwi, Client $api)
	{
		$user = User::checkToken($request->token);

		if (!empty($user))
		{
			$sticker = Sticker::find($request->sticker_id);

			if (!empty($sticker))
			{
				$paidSticker = PaidSticker::where('sticker_id', '=', $request->sticker_id)
					->where('user_id', '=', $user->id)
					->where('is_paid', '=', 0)
					->first();

				if ($paidSticker)
				{
					$fields = [
						'billId' => $paidSticker->bill_id,
						'amount' => $sticker->price,
						'publicKey' => config('qiwi.public'),
						'comment' => 'Покупка стикеров '.$sticker->title
					];
					$billResponse = $qiwi->createPaymentForm($fields);

					if (empty($billResponse['errorCode']))
					{
						$response = [
							'url' => $billResponse,
							'message' => 'Перенаправляем на страницу оплаты...'
						];
					}
					else
					{
						$code = 400;
						$response = [
							'error' => true,
							'message' => 'Произошла ошибка'
						];
					}
				}
				else
				{
					$billId = Str::random(30);

					$fields = [
						'billId' => $billId,
						'amount' => $sticker->price,
						'publicKey' => config('qiwi.public'),
						'comment' => 'Покупка стикеров '.$sticker->title
					];
					$billResponse = $qiwi->createPaymentForm($fields);

					if (empty($billResponse['errorCode']))
					{
						$paidSticker = $user->paidStickers()->create([
							'bill_id' => $billId,
							'sticker_id' => $sticker->id,
						]);
						
						$response = [
							'url' => $billResponse,
							'message' => 'Перенаправляем на страницу оплаты...'
						];
					}
					else
					{
						$code = 400;
						$response = [
							'error' => true,
							'message' => 'Произошла ошибка'
						];
					}
				}
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
		else
		{
			$code = 401;
			$response = [
				'error' => true,
				'message' => 'Вы не авторизованы'
			];
		}
		return response()->json($response, $code ?? 200);
	}
}
