<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampaignProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'type',
        'campaign_id',
    ];

    public function campaign()
    {
        return $this->belongsTo('\App\Models\Campaign', 'campaign_id');
    }
}
