<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'compaign_name',
        'loyalty',
    ];

    public function products()
    {
        return $this->hasMany('\App\Models\CompaignProduct', 'compaign_id');
    }
}
