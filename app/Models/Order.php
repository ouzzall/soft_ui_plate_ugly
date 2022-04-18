<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'order_name',
        'loyalty_points',
        'delivery_date',
        'amount',
        'is_fulfilled',
    ];

    public function user()
    {
        return $this->belongsTo('\App\Models\User', 'user_id');
    }

    public function refunds()
    {
        return $this->hasMany('\App\Models\OrderProductRefund', 'order_id');
    }
}
