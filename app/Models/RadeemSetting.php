<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RadeemSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'min_radeem_value',
        'max_radeem_value',
    ];
}
