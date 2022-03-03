<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PriceRule extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'price_rule_id',
        'title',
        'value_type',
        'value',
        'starts_at',
        'ends_at',
        'discount_code',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo('\App\Models\User', 'user_id');
    }
}
