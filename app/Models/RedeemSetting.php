<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RedeemSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'min_redeem_value',
        'max_redeem_value',
    ];
}
