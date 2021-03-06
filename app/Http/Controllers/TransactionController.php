<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function getTransactions(Request $request)
    {
        $user = Auth::user();
        if ($user->is_blocked && $user->role->type == 'customer') {
            return response()->json([
                'success' => false,
                'message' => 'You are blocked from using the application!',
                'data' => null
            ]);
        }
        $transactions = Transaction::with(['user', 'transaction_type']);
        $transactions->when($user->role->type == 'customer', function ($q) use ($user) {
            $q->whereHas('user', function ($q) use ($user) {
                $q->where('id', $user->id);
            });
        });
        $transactions->when($request->get('type'), function($q) use($request) {
            $q->where('transaction_type_id', $request->type);
        });
        $transactions->when($request->get('startDate') || $request->get('endDate'), function($q) use($request) {
            $q->whereDate('created_at', '>=', $request->startDate)->whereDate('created_at', '<=', $request->endDate);
        });
        $transactions->when($request->get('search'), function ($q) use ($request) {
            $q->where(function($q) use ($request) {
                $q->whereHas('user', function($q) use ($request) {
                    $q->where('name', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('email', 'LIKE', '%' . $request->search . '%');
                })
                ->orWhereHas('transaction_type', function($q) use ($request) {
                    $q->where('title', 'LIKE', '%' . $request->search . '%');
                })
                ->orWhere('loyalty_points', 'LIKE', '%'. $request->search .'%')
                ->orWhereDate('created_at', 'LIKE', '%'. $request->search .'%');
            });
        });
        $count = $transactions->count();
        $transactions->when($request->has('skip') && $request->has('limit'), function ($q) use ($request) {
            $q->take($request->limit)->skip($request->skip);
        });
        $transactions = $transactions->orderBy('id', 'DESC')->get();
        $transactions = $transactions->map(function ($value) {
            $value['date'] = Carbon::parse($value['created_at'])->format('d/m/Y');
            return $value;
        });
        $data = [
            'data' => $transactions,
            'pages' => ceil($count / $request->limit),
            'row_count' => $count,
        ];
        return response()->json([
            'success' => true,
            'message' => 'Transactions retrieved sucessfully!',
            'data' => $data,
        ]);
    }
}
