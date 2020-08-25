<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaidSticker extends Model
{
	protected $table = 'paid_stickers';

	protected $fillable = [
		'bill_id', 'is_paid', 'user_id', 'sticker_id'
	];

	public function sticker()
	{
		return $this->belongsTo(Sticker::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
