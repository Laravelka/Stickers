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

Route::prefix('stickers')->group(function() {
	Route::get('getAll', 'Api\StickerController@getAll');
	Route::get('getById', 'Api\StickerController@getById');
	Route::post('sendFiles', 'Api\StickerController@sendFiles');
	Route::get('installation', 'Api\StickerController@installation');
});

Route::middleware(['isAdmin'])->prefix('admin')->group(function() {
	Route::prefix('stickers')->group(function() {
		Route::get('getAll', 'Api\Admin\StickersController@getAll');
		Route::post('create', 'Api\Admin\StickersController@create');
		Route::get('getById', 'Api\Admin\StickersController@getById');
		Route::get('getPaid', 'Api\Admin\StickersController@getPaid');
		Route::delete('delete', 'Api\Admin\StickersController@delete');
	});
	
	Route::prefix('settings')->group(function() {
		Route::get('getAll', 'Api\Admin\SettingsController@getAll');
		Route::post('update', 'Api\Admin\SettingsController@update');
	});
});

Route::any('qiwi/webhook', 'Api\PaymentController@qiwiWebhook');
Route::any('yandex/webhook', 'Api\PaymentController@yandexWebhook');

Route::post('users/allowNotify', 'Api\UserController@allowNotify');
Route::post('users/setAccessToken', 'Api\UserController@setAccessToken');

Route::any('qiwi/invoicing', 'Api\PaymentController@invoicingQiwi');
