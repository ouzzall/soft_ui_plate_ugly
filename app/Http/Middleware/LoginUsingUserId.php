<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LoginUsingUserId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $shop = $request->shop;
        $user = User::firstWhere('name', $shop);
        if(!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Shop not found!',
                'data' => null
            ], Response::HTTP_NOT_FOUND);
        }
        auth()->loginUsingId($user->id);
        return $next($request);
    }
}
