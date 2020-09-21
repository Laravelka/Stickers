<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StickerImage extends Model
{
	protected $table = 'stickers_image';
	
	protected $fillable = [
		'url'
	];
	
	public function sticker()
	{
		return $this->belongsTo(Sticker::class);
	}
}
