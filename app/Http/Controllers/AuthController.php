<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $remember_me = ($request->remember_me == 'on') ? true : false;
        $user = null;
        if (Auth::attempt($credentials, $remember_me)) {
            $user = Auth::user()->load('role');
            if ($user->is_blocked && $user->role->type == 'customer') {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return response()->json([
                    'success' => false,
                    'message' => 'You are blocked from using the application!',
                    'data' => null
                ]);
            }
            return response()->json([
                'success' => true,
                'message' => 'User Logged in successfully',
                'data' => $user
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials! Please try again',
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

    public function signup(CreateUserRequest $request)
    {
        $request['password'] = bcrypt($request->password);
        $request['role_id'] = 2;
        $name = '';
        $nameSplit = explode(' ', $request->name);
        DB::beginTransaction();
        try {
            $user = User::create($request->all());
            $user->loyalty()->create([
                'loyalty_earned' => 0.0,
                'loyalty_radeemed' => 0.0,
            ]);
            $customer = getShop()->api()->rest('POST', '/admin/api/2022-01/customers.json', [
                'customer' => [
                    'first_name' => (count($nameSplit) > 1) ? $nameSplit[0]: $request->name,
                    'last_name' => (count($nameSplit) > 1) ? $nameSplit[1]: $request->name,
                    'email' => $request->email,
                ]
            ]);
            if($customer['status'] != 200) {
                return response()->json([
                    'success' => false,
                    'message' => 'An error occured while registration!',
                    'user' => null
                ]);
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'user' => $user
            ]);
        } catch (Exception $exception) {
            DB::rollBack();
        }
    }

    public function getSession(Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user()->load(['role', 'transactions']);
            if ($user->is_blocked && $user->role->type == 'customer') {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                return response()->json([
                    'success' => false,
                    'message' => 'You are blocked!',
                    'data' => null
                ]);
            }
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
