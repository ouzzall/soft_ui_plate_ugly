<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function getTransactions()
    {
        $transactions = Transaction::all()->load(['user','transaction_type']);
        return response()->json([
            'success' => true,
            'message' => 'Transactions retrieved sucessfully!',
            'data' => $transactions,
        ]);
    }
}
