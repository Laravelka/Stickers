<?php

namespace App\Http\ViewComposers;

use App\User;
use Illuminate\View\View;

class UserComposer
{
	/**
	 * The user repository implementation.
	 *
	 * @var UserRepository
	 */
	protected $user;
	
	/**
	 * Create a new profile composer.
	 *
	 * @param  UserRepository  $users
	 * @return void
	 */
	public function __construct(User $user)
	{
		// Dependencies automatically resolved by service container...
		$this->user = $user;
	}
	
	/**
	 * Bind data to the view.
	 *
	 * @param  View  $view
	 * @return void
	 */
	public function compose(View $view)
	{
		$userData = false;
		if ($this->user->isValid())
		{
			$user = $this->user->where('vk_id', '=', request()->input('vk_user_id'))->first();

			if ($user)
				$userData = $user->toArray();
		}
		$view->with('userData', $userData);
	}
}