<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sticker extends Model
{
	protected $table = 'stickers';

	protected $fillable = [
		'title', 'price', 'description'
	];

	public function stickersImage()
	{
		return $this->hasMany(StickerImage::class);
	}

	public function paidStickers()
	{
		return $this->hasMany(PaidSticker::class);
	}
}
