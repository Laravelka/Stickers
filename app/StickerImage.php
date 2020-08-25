<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StickerImage extends Model
{
	protected $table = 'stickers_image';

	public function sticker()
	{
		return $this->belongsTo(Sticker::class);
	}
}
