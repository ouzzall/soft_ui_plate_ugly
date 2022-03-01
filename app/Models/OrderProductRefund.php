<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProductRefund extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'loyalty_points',
    ];

    public function order()
    {
        return $this->belongsTo('\App\Models\Order', 'order_id');
    }

}
