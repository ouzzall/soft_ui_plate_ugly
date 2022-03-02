<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function getTransactions()
    {
        $user = Auth::user();
        $transactions = Transaction::query();
        $transactions->when($user->role->type == 'customer', function ($q) use ($user) {
            $q->whereHas('user', function($q) use ($user) {
                $q->where('id', $user->id);
            });
        });
        $transactions = $transactions->with(['user','transaction_type'])->get();
        return response()->json([
            'success' => true,
            'message' => 'Transactions retrieved sucessfully!',
            'data' => $transactions,
        ]);
    }
}
