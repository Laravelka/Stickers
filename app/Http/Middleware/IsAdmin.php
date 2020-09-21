<?php

namespace App\Http\Middleware;

use Closure;
use App\User;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
		if ($request->has('token'))
		{
			$user = User::checkToken($request->token);
			
			if ($user)
			{
				if ($user->is_admin !== 1)
				{
					return response()->json([
						'error' => true,
						'message' => 'Недостаточно прав'
					], 400);
				}
			}
			else
			{
				return response()->json([
					'error' => true,
					'message' => 'API token недействителен'
				], 400);
			}
		}
        return $next($request);
    }
}
