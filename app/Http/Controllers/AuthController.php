<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $remember_me = ($request->remember_me == 'on') ? true : false;
        $user = null;
        if (Auth::attempt($credentials, $remember_me)) {
            $user = Auth::user()->load('role');
            return response()->json([
                'success' => true,
                'message' => 'User Logged in successfully',
                'data' => $user
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials',
            'data' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'success' => true,
            'message' => 'User Logged out successfully',
            'user' => null
        ]);
    }

    public function signup()
    {
    }

    public function getSession()
    {
        if (Auth::check()) {
            $user = Auth::user()->load('role');
            return response()->json([
                'success' => true,
                'message' => 'Current User retrieved successfully!',
                'data' => $user,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Session not exists!',
                'data' => null
            ]);
        }
    }
}
