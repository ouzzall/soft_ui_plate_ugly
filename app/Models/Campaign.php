<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Campaign extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'campaign_name',
        'loyalty_points',
    ];

    public function products()
    {
        return $this->hasMany('\App\Models\CampaignProduct', 'campaign_id');
    }
}
