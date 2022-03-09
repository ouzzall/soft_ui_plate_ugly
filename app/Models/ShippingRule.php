<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShippingRule extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_amount',
        'shipping_amount',
        'discount_type',
        'shipping_rule_type',
    ];

    public function rule_type()
    {
        return $this->belongsTo('\App\Models\ShippingRuleType', 'shipping_rule_type');
    }
}
