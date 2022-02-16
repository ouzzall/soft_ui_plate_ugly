<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLoyalty extends Model
{
    use HasFactory;
    protected $fillable = [
        'loyalty_earned',
        'loyalty_radeemed',
        'last_earned_date',
    ];

    public function user()
    {
        return $this->belongsTo('\App\Models\User', 'user_id');
    }
}
