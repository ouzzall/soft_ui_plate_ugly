<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompaignProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'type',
        'compaign_id',
    ];

    public function compaign()
    {
        return $this->belongsTo('\App\Models\Compaign', 'compaign_id');
    }
}
