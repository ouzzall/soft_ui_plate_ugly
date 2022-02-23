<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompaignProduct extends Model
{
    use HasFactory;

    public function compaign()
    {
        return $this->belongsTo('\App\Models\Compaign', 'compaign_id');
    }
}
