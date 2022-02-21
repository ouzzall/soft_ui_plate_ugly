<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsers()
    {
        $users = User::where('role_id', 2)->with('loyalty')->get();
        return response()->json([
            'success' => true,
            'message' => 'Users retrieved successfully!',
            'data' => $users
        ]);
    }
}
