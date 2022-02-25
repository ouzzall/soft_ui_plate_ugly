<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'campaign_name',
        'loyalty',
    ];

    public function products()
    {
        return $this->hasMany('\App\Models\CampaignProduct', 'campaign_id');
    }
}
