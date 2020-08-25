<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('stickers/getAll', 'Api\StickerController@getAll');
Route::get('stickers/getById', 'Api\StickerController@getById');
Route::post('stickers/sendFiles', 'Api\StickerController@sendFiles');
Route::get('stickers/installation', 'Api\StickerController@installation');

Route::any('qiwi/webhook', 'Api\PaymentController@qiwiWebhook');
Route::any('yandex/webhook', 'Api\PaymentController@yandexWebhook');

Route::post('users/allowNotify', 'Api\UserController@allowNotify');
Route::post('users/setAccessToken', 'Api\UserController@setAccessToken');

Route::any('qiwi/invoicing', 'Api\PaymentController@invoicingQiwi');
